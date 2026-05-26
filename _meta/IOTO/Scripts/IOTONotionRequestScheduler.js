function IOTONotionRequestScheduler(tp) {
  return class NotionRequestScheduler {
    constructor({ minIntervalMs = 0, maxConcurrency = 1 } = {}) {
      this.minIntervalMs =
        Number(minIntervalMs) > 0 ? Number(minIntervalMs) : 0;
      this.maxConcurrency =
        Number(maxConcurrency) >= 1 ? Math.floor(Number(maxConcurrency)) : 1;
      this.queue = [];
      this.activeCount = 0;
      this.lastStartAt = 0;
      this.pauseUntil = 0;
      this.timer = null;
    }

    updateConfig({ minIntervalMs, maxConcurrency } = {}) {
      if (minIntervalMs !== undefined) {
        this.minIntervalMs =
          Number(minIntervalMs) > 0 ? Number(minIntervalMs) : 0;
      }
      if (maxConcurrency !== undefined) {
        this.maxConcurrency =
          Number(maxConcurrency) >= 1 ? Math.floor(Number(maxConcurrency)) : 1;
      }
      this._drain();
    }

    pause(ms) {
      const waitMs = Number(ms) > 0 ? Number(ms) : 0;
      if (!waitMs) return;
      const until = Date.now() + waitMs;
      if (until > this.pauseUntil) {
        this.pauseUntil = until;
      }
      this._drain();
    }

    schedule(task) {
      return new Promise((resolve, reject) => {
        this.queue.push({ task, resolve, reject });
        this._drain();
      });
    }

    _drain() {
      if (this.timer) return;

      while (this.activeCount < this.maxConcurrency && this.queue.length) {
        const now = Date.now();
        const earliest =
          Math.max(this.lastStartAt + this.minIntervalMs, this.pauseUntil) || 0;
        if (earliest > now) {
          this.timer = setTimeout(() => {
            this.timer = null;
            this._drain();
          }, earliest - now);
          return;
        }

        const job = this.queue.shift();
        if (!job) return;
        this.activeCount++;
        this.lastStartAt = Date.now();

        Promise.resolve()
          .then(() => job.task())
          .then((res) => job.resolve(res))
          .catch((err) => job.reject(err))
          .finally(() => {
            this.activeCount--;
            this._drain();
          });
      }
    }
  };
}

module.exports = IOTONotionRequestScheduler;

