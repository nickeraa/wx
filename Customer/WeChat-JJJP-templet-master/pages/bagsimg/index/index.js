var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        replu: {},
        zhimgurl: a.globalData.imgzhurl
    },
    onLoad: function(a) {
        a.img && this.setData({
            img: a.img
        }), console.log(this.data.img);
    },
    back: function() {
        wx.navigateBack({
            delta: 0
        });
    },
    previewImage: function(a) {
        var t = this.data.zhimgurl + this.data.img + "/" + a.target.dataset.src, o = [];
        for (var e in console.log(t), console.log(this.data.replu), this.data.replu) {
            var i;
            i = this.data.zhimgurl + this.data.img + "/" + this.data.replu[e].OriginalPath, 
            o.push(i);
        }
        console.log(o), wx.previewImage({
            current: t,
            urls: o
        });
    },
    onShow: function() {
        var t = this;
        wx.request({
            url: a.globalData.api + "wx_zhimgurl.ashx",
            data: {
                img: t.data.img
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), t.setData({
                    replu: a.data
                }), console.log(t.data.replu);
            }
        });
    }
});