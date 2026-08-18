export function methodNotAllowed(allow = 'POST') {
  return (_req, res) => {
    res.set('Allow', allow)
    res.status(405).json({
      ok: false,
      message: 'Method not allowed.',
    })
  }
}
