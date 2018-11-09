/**
 * 登录
 *
 * @url /upload
 * POST
 */
module.exports = function(req) {
  if (req.query.isIe9==='true') {
    req.res.set('Content-Type', 'text/html')
  }
  return {
    status: 1,
    data: {
      fileName: '@integer(0).jpg',
      filePath: '@image(200x200)',
      fileUrl: '@image(200x200)'
    }
  }
}
