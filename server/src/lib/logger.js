function write(level, msg, extra = {}) {
  const payload = {
    ts: new Date().toISOString(),
    level,
    msg,
  }

  for (const [key, value] of Object.entries(extra)) {
    if (value === undefined) continue
    payload[key] = value
  }

  const line = JSON.stringify(payload)
  if (level === 'error') {
    console.error(line)
    return
  }
  console.log(line)
}

export const logger = {
  info: (msg, extra) => write('info', msg, extra),
  warn: (msg, extra) => write('warn', msg, extra),
  error: (msg, extra) => write('error', msg, extra),
}
