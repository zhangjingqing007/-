//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHaveData:false
  },
  onLoad: function () {
    let temporaryStorage = wx.getStorageSync('temporaryStorage');
    if (temporaryStorage instanceof Array && temporaryStorage.length > 0){
      //有测试数据
      this.setData({
        isHaveData:true
      })
    }else{
      this.setData({
        isHaveData: false
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  start:function() {
    wx.removeStorageSync('temporaryStorage');
    this.setData({
      isHaveData: false
    });
    wx.navigateTo({
      url: '../synopsis/index'
    })
  },
  goOn:function(){
    //继续测试
    wx.navigateTo({
      url: `../question/index?questionIndex=${wx.getStorageSync('temporaryStorage').length}`
    })
    this.setData({
      isHaveData: true
    });
  }
})
