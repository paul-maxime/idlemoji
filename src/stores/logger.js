class Logger {
  callback = null;
  pending = [];

  register(callback) {
    this.callback = callback;
    for (const { message, params } of this.pending) {
      this.callback(message, params);
    }
    this.pending = [];
  }

  emit(message, params) {
    if (this.callback) {
      this.callback(message, params);
    } else {
      this.pending.push({ message, params });
    }
  }
}

export default new Logger();
