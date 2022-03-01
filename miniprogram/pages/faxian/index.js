
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top:'',
    nickName:'',
    avatarUrl:'',
    faxianList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let top =  wx.getMenuButtonBoundingClientRect().top
    this.setData({
      top:top
    })
    this._loadfaxianList()
    var that = this
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        that.setData({
          nickName : userInfo.nickName,
          avatarUrl :userInfo.avatarUrl
        })
      }
    })
    
  },
  _loadfaxianList( start = 0){
    wx.showLoading({
      title: 'loading',
    })
    wx.cloud.callFunction({
      name:'faxian',
      data:{
        start,
        $url:'list',
        
        count:20
      }
    }).then((res)=>{
      this.setData({
        faxianList: this.data.faxianList.concat(res.result)
      })
    })
    wx.hideLoading()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 0
    })
  }
  },
  // onPublish(){
  //       // wx.getSetting({
  //   //   success (res){
  //   //     if (res.authSetting['scope.userInfo']) {
  //   //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
  //   //       wx.switchTab({url:'../index/index2'})
  //   //     }else{
  //   //       wx.navigateTo({
  //   //         url: '../register/register',
  //   //       })
  //   //     }
  //   //   }
  //   // })
  //   wx.navigateTo({
  //     url:`/pages/publish/publish?nickName=${this.data.nickName}&avatarUrl=${this.data.avatarUrl}`
  //   })
  // },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    let wxInfo = e.detail.userInfo
    console.log(wxInfo)
        wx.navigateTo({
      url:`/pages/publish/publish?nickName=${wxInfo.nickName}&avatarUrl=${wxInfo.avatarUrl}`
    })

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      faxianList:[]
    })
    this._loadfaxianList(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._loadfaxianList(this.data.faxianList.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})