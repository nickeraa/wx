var a=getApp()
Page({

  data: {
    sex:'',
    username:'',
    code:'',
    imgUrl: "", // 本地临时图
    serverImg: "" ,// 后端返回线上图地址
    CustomBar:a.globalData.CustomBar,
    StatusBar:a.globalData.StatusBar,
   
  },

// 选择单张图片
chooseSingleImg() {
  wx.chooseMedia({
    count: 1, // 只允许选1张
    mediaType: ["image"],
    sourceType: ["album", "camera"],
    sizeType: ["compressed"], // 压缩图
    success: (res) => {
      const tempPath = res.tempFiles[0].tempFilePath;
      this.setData({ imgUrl: tempPath });
      //获取图片缓存文件
      console.log(tempPath)
      // 自动上传到服务器
     this.uploadSingle(tempPath);
    }
  });
},

// 上传单图接口
uploadSingle(filePath) {

  var that=this;
  wx.showLoading({ title: "上传中" });
  wx.uploadFile({
    url: "https://*****/job168/wx/upimg.ashx",
    filePath: filePath,
    name: "file",
    formData: {
     // token: wx.getStorageSync("token")
    },
    success: (res) => {
      const result = JSON.parse(res.data);
      console.log(result)
      that.setData({ serverImg: result.data });
      console.log(that.data.serverImg)
      if (result.code === 0) {
        that.setData({ serverImg: result.data });
        wx.showToast({ title: "上传成功" });
      } else {
        wx.showToast({ title: result.msg, icon: "none" });
      }
    },
    fail: () => {
      wx.showToast({ title: "上传失败", icon: "error" });
    },
    complete: () => {
      wx.hideLoading();
    }
  });
},



getusername:function(e)
{

console.log(e.detail.value)
{

this.setData({
username:e.detail.value

})
}

},


getcode:function(e)
{

console.log(e.detail.value)
{

this.setData({
code:e.detail.value

})

}


},


checkinput()
{

if(this.data.username=='')
{
  wx.showModal({
    title: '提示',
    content: '姓名不能为空！',
    showCancel: false,
    complete: (res) => {}
  })
  return false

}
else if(this.data.code=='')
{

  wx.showModal({
    title: '提示',
    content: '身份证号码不能为空！',
    showCancel: false,
    complete: (res) => {}
  })
 return false
}


else if(this.data.serverImg=="")
{

  wx.showModal({
    title: '提示',
    content: '请上传照片！',
    showCancel: false,
    complete: (res) => {}
  })
 return false
}
else{

return true

}



},


//姓名，身份证，照片，插入数据库保存
apply()
{

if(this.checkinput())
{
console.log(this.data.username)
wx.request({
  url: "https://*****/job168/WebOffices/checkbody.aspx",
  method:"POST",
  header:{
    "content-type":"application/x-www-form-urlencoded" //
  },
  data: {
    username: this.data.username,
    code: this.data.code,
    serverImg:this.data.serverImg,
  
  },
  header: {
    "content-type": "application/x-www-form-urlencoded"
  },
  dataType: "json",
  success: function (a) {
    console.log(a.data)
  

  }
});

}



},


  onShow() {

  },



  
  
})