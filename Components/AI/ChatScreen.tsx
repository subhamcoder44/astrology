// File: src/screens/ChatScreen.tsx
// ----------------------------------------------------
import { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Markdown from "react-native-markdown-display";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

type Role = "user" | "assistant" | "system";

type Message = {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
  status?: "sending" | "streaming" | "done" | "error" | "stopped";
  error?: string;
};

type ChatScreenProps = {
  /** Optional: backend endpoint that returns streaming text (SSE or chunked) */
  apiUrl?: string;
  /** Optional: custom header(s) to pass to your backend */
  headers?: Record<string, string>;
  /** Optional: model name to send to your backend */
  model?: string;
};

/** Minimal stream helper (works with SSE `data: { "delta": "..." }` or plain chunks) */
async function* readBody(res: any): AsyncGenerator<string> {
  // @ts-ignore: React Native fetch Response does not have a 'body' property
  const reader = res.body && res.body.getReader ? res.body.getReader() : undefined;
  if (!reader) return;
  // @ts-ignore: TextDecoder may not be available in all React Native environments
  const decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8") : undefined;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    yield decoder.decode(value, { stream: true });
  }
}

function parseSSE(chunk: string): string[] {
  const out: string[] = [];
  for (const raw of chunk.split("\n")) {
    const line = raw.trim();
    if (!line.startsWith("data:")) continue;
    const json = line.slice(5).trim();
    if (!json || json === "[DONE]") continue;
    try {
      const obj = JSON.parse(json) as { delta?: string };
      if (obj.delta) out.push(obj.delta);
    } catch {/* ignore */}
  }
  return out;
}

async function sendMessageStream(
  apiUrl: string,
  payload: { messages: Array<Pick<Message, "role" | "content">>; model?: string },
  headers?: Record<string, string>,
  onDelta?: (text: string) => void
): Promise<string> {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(headers || {}) },
    body: JSON.stringify({ ...payload, stream: true }),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);

  let full = "";
  for await (const chunk of readBody(res)) {
    const deltas = parseSSE(chunk);
    if (deltas.length) {
      for (const d of deltas) {
        full += d;
        onDelta?.(d);
      }
    } else {
      full += chunk;
      onDelta?.(chunk);
    }
  }
  return full;
}

export default function ChatScreen({ apiUrl, headers, model }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuid(),
      role: "assistant",
      content:
        "Hi! I’m your AI assistant. Ask me anything.\n\n*Tip:* Try sending a message and watch me stream the reply.",
      createdAt: Date.now(),
      status: "done",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const flatRef = useRef<FlatList<Message>>(null);

  const toApiShape = useCallback(
    (arr: Message[]) => arr.map((m) => ({ role: m.role, content: m.content })),
    []
  );

  const send = useCallback(async () => {
    const content = input.trim();
    if (!content || isStreaming) return;

    const userMsg: Message = {
      id: uuid(),
      role: "user",
      content,
      createdAt: Date.now(),
      status: "done",
    };
    const botMsg: Message = {
      id: uuid(),
      role: "assistant",
      content: "",
      createdAt: Date.now(),
      status: "streaming",
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
    setIsTyping(true);
    setIsStreaming(true);

    const onDelta = (delta: string) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === botMsg.id ? { ...m, content: m.content + delta } : m))
      );
    };

    try {
      if (apiUrl) {
        await sendMessageStream(
          apiUrl,
          { messages: toApiShape([...messages, userMsg]), model },
          headers,
          onDelta
        );
      } else {
        // local demo typing (no backend)
        const demo =
          "This is a **streamed** local demo.\n\n- Markdown supported\n- Code\n```ts\nconsole.log('Hello RN');\n```\n- Typing indicator";
        for (const ch of demo) {
          await new Promise<void>((resolve) => setTimeout(resolve, 10));
              onDelta(ch);
            }
          }
          setMessages((prev) => prev.map((m) => (m.id === botMsg.id ? { ...m, status: "done" } : m)));
    } catch (e: any) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsg.id ? { ...m, status: "error", error: String(e?.message || e) } : m
        )
      );
    } finally {
      setIsTyping(false);
      setIsStreaming(false);
      requestAnimationFrame(() => flatRef.current?.scrollToEnd({ animated: true }));
    }
  }, [apiUrl, headers, input, isStreaming, messages, model, toApiShape]);

  const stop = useCallback(() => {
    // UI-only stop (does not abort network). If you want true cancel, we can add AbortController.
    setIsTyping(false);
    setIsStreaming(false);
    setMessages((prev) => {
      const last = [...prev].reverse().find((m) => m.role === "assistant" && m.status === "streaming");
      if (!last) return prev;
      return prev.map((m) => (m.id === last.id ? { ...m, status: "stopped" } : m));
    });
  }, []);

  const retry = useCallback(() => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser) setInput(lastUser.content);
  }, [messages]);

  const header = useMemo(
    () => (
      <View style={styles.header}>
        <Text style={styles.title}>Chat Bot</Text>
        <Text style={styles.subtitle}>React Native • TypeScript • Streaming</Text>
      </View>
    ),
    []
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {header}

      <FlatList
        ref={flatRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        onContentSizeChange={() => flatRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => <Bubble msg={item} />}
      />

      {isTyping && (
        <View style={styles.typing}>
          <ActivityIndicator />
          <Text style={styles.typingText}>Assistant is typing…</Text>
        </View>
      )}

      <View style={styles.inputRow}>
        <TouchableOpacity style={[styles.smallBtn, styles.secondary, styles.mr8]} onPress={retry}>
          <Text style={styles.smallBtnText}>Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.smallBtn, styles.secondary, styles.mr8]}
          onPress={stop}
          disabled={!isStreaming}
        >
          <Text style={[styles.smallBtnText, !isStreaming && { opacity: 0.5 }]}>Stop</Text>
        </TouchableOpacity>

        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            placeholder="Message…"
            value={input}
            onChangeText={setInput}
            multiline
            onSubmitEditing={send}
            blurOnSubmit={false}
          />
        </View>

        <TouchableOpacity style={styles.sendBtn} onPress={send}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

/** Inline bubble to keep this file self-contained */
function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  const showMd = /[`*_#\-]/.test(msg.content);
  return (
    <View style={[styles.wrap, isUser ? styles.right : styles.left]}>
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleBot]}>
        {showMd ? (
          <Markdown style={mdStyles}>{msg.content}</Markdown>
        ) : (
          <Text style={[styles.text, isUser ? styles.textUser : styles.textBot]}>{msg.content}</Text>
        )}
        {!!msg.status && msg.status !== "done" && (
          <Text style={styles.meta}>{msg.status}</Text>
        )}
      </View>
      <Text style={styles.time}>{new Date(msg.createdAt).toLocaleTimeString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: { paddingTop: 18, paddingBottom: 6, paddingHorizontal: 16, backgroundColor: "#ffffff" },
  title: { fontSize: 20, fontWeight: "700" },
  subtitle: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  list: { padding: 12, paddingBottom: 90 },
  typing: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingBottom: 6 },
  typingText: { marginLeft: 8, color: "#6b7280" },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e7eb",
    backgroundColor: "white",
  },
  mr8: { marginRight: 8 },
  smallBtn: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10 },
  secondary: { backgroundColor: "#f3f4f6" },
  smallBtnText: { color: "#111827", fontSize: 12, fontWeight: "600" },
  inputWrap: {
    flex: 1,
    minHeight: 42,
    maxHeight: 140,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    marginRight: 8,
  },
  input: { padding: 10, fontSize: 16 },
  sendBtn: { backgroundColor: "#111827", paddingHorizontal: 14, paddingVertical: 12, borderRadius: 12 },
  sendText: { color: "white", fontWeight: "700" },
  wrap: { marginVertical: 6, paddingHorizontal: 10, maxWidth: "100%" },
  left: { alignSelf: "flex-start" },
  right: { alignSelf: "flex-end" },
  bubble: { borderRadius: 16, padding: 12, maxWidth: "92%" },
  bubbleUser: { backgroundColor: "#007AFF" },
  bubbleBot: { backgroundColor: "#F2F2F7" },
  text: { fontSize: 16, lineHeight: 22 },
  textUser: { color: "white" },
  textBot: { color: "#111" },
  meta: { marginTop: 4, fontSize: 10, color: "#6b7280" },
  time: { fontSize: 10, color: "#9ca3af", marginTop: 2, marginHorizontal: 10 },
});
  
const mdStyles = {
  body: { color: "#111", fontSize: 16, lineHeight: 22 },
  code_inline: { backgroundColor: "#e5e7eb", padding: 3, borderRadius: 6 },
  fence: { backgroundColor: "#e5e7eb", padding: 10, borderRadius: 8 },
};
