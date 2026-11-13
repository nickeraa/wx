using System;
using System.IO;
using System.Web;

namespace FineUIPro.EmptyProjectNet40
{
    /// <summary>
    /// 金银币寄卖：员工拍照上传货品照片（专用接口，存站点 jmimgs 目录，与 upload 同一物理目录）
    /// 调用：multipart/form-data，字段名 imgfile（wx.uploadFile）
    /// 返回：{"url":"/jmimgs/jm_yyyymmddhhmmss_xxxxxx.jpg"}（相对路径，前端拼完整 URL 显示、原样入库）
    ///       / {"errcode":-1,"errmsg":"..."}
    /// 说明：
    ///   - 项目公共上传接口 wx_postimg.ashx 保持不变，其他模块的拍照上传不受影响；
    ///   - 仅允许 jpg/jpeg/png，≤5M（腾讯电子签合同图片控件限制）；
    ///   - 入库相对路径后，合同发起时 ReadGoodsImage 直接映射服务器本地磁盘读文件（不走 HTTP）；
    ///   - 服务器日志：App_Data/wx_jmjm_img_log.txt。
    /// </summary>
    public class wx_jmjm_img : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json; charset=utf-8";
            try
            {
                HttpPostedFile f = context.Request.Files["imgfile"];
                if (f == null || f.ContentLength == 0)
                {
                    context.Response.Write("{\"errcode\":-1,\"errmsg\":\"未收到图片文件\"}");
                    return;
                }
                if (f.ContentLength > 5 * 1024 * 1024)
                {
                    context.Response.Write("{\"errcode\":-2,\"errmsg\":\"图片超过5M，请重新拍摄\"}");
                    return;
                }
                string ext = Path.GetExtension(f.FileName).ToLowerInvariant();
                if (ext != ".jpg" && ext != ".jpeg" && ext != ".png")
                {
                    context.Response.Write("{\"errcode\":-3,\"errmsg\":\"仅支持 jpg/png 图片\"}");
                    return;
                }

                // 保存目录：站点 jmimgs（与 upload 同一物理目录），不存在则创建
                string dir = context.Server.MapPath("~/jmimgs");
                if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
                string name = "jm_" + DateTime.Now.ToString("yyyyMMddHHmmss")
                    + "_" + Guid.NewGuid().ToString("N").Substring(0, 6) + ext;
                f.SaveAs(Path.Combine(dir, name));

                // 返回相对路径（前端拼完整 URL 显示，入库原样保存，合同发起时本地直读）
                context.Response.Write("{\"url\":\"/jmimgs/" + name + "\"}");
            }
            catch (Exception ex)
            {
                try
                {
                    string dir2 = context.Server.MapPath("~/App_Data");
                    if (!Directory.Exists(dir2)) Directory.CreateDirectory(dir2);
                    File.AppendAllText(Path.Combine(dir2, "wx_jmjm_img_log.txt"),
                        DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " 异常:" + ex.Message + "\r\n");
                }
                catch { }
                context.Response.Write("{\"errcode\":-9,\"errmsg\":\"上传失败，请重试\"}");
            }
        }

        public bool IsReusable
        {
            get { return false; }
        }
    }
}
