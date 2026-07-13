let io;

const documentUsers = new Map();

const initializeSocket = (server) => {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
    origin: [
      "http://localhost:5173",
      "https://collabspace-ai.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
  });

  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("join-document", ({ documentId, user }) => {
      socket.join(`document:${documentId}`);

      socket.documentId = documentId;

      if (!documentUsers.has(documentId)) {
        documentUsers.set(documentId, new Map());
      }

      documentUsers.get(documentId).set(socket.id, user);

      const uniqueUsers = [
        ...new Map(
            Array.from(documentUsers.get(documentId).values()).map((user) => [
            user.id,
            user,
            ])
        ).values(),
        ];

        io.to(`document:${documentId}`).emit(
        "online-users",
        uniqueUsers
        );

      console.log(
        `📄 ${user.name} joined document:${documentId}`
      );
    });

    socket.on("editor-update", ({ documentId, content }) => {
      socket.to(`document:${documentId}`).emit(
        "receive-editor-update",
        content
      );
    });

    socket.on("leave-document", (documentId) => {
      socket.leave(`document:${documentId}`);

      const users = documentUsers.get(documentId);

      if (users) {
        users.delete(socket.id);

        const uniqueUsers = [
        ...new Map(
            Array.from(users.values()).map((user) => [
            user.id,
            user,
            ])
        ).values(),
        ];

        io.to(`document:${documentId}`).emit(
        "online-users",
        uniqueUsers
        );

        if (users.size === 0) {
          documentUsers.delete(documentId);
        }
      }

      console.log(
        `🚪 ${socket.id} left room document:${documentId}`
      );
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);

      const documentId = socket.documentId;

      if (!documentId) return;

      const users = documentUsers.get(documentId);

      if (!users) return;

      users.delete(socket.id);

      const uniqueUsers = [
        ...new Map(
            Array.from(users.values()).map((user) => [
            user.id,
            user,
            ])
        ).values(),
        ];

        io.to(`document:${documentId}`).emit(
        "online-users",
        uniqueUsers
        );

      if (users.size === 0) {
        documentUsers.delete(documentId);
      }
    });
  });

  return io;
};

module.exports = {
  initializeSocket,
};