const db = wx.cloud.database();
Page({
  data: {
    index: 0,
    school: ['黑龙江大学', '哈尔滨理工大学', '东北林业大学', '东北农业大学'],
    slschool: "",
    avatarUrl: "",
    gender: '',
    nickName: "",
    openid: ''
  },
  onLoad: function (options) {},
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let info = e.detail.value
    this.setData({
      slschool: info.school
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    let wxInfo = e.detail.userInfo
    console.log(wxInfo)
    db.collection('app-userinfo').add({
      data: {
        slschool: this.data.slschool,
        avatarUrl: wxInfo.avatarUrl,
        gender: wxInfo.gender,
        nickName: wxInfo.nickName
    }
    }).then((res) => {
      if (res.errMsg === "collection.add:ok") {
        wx.switchTab({
          url: '../index/index1'
        })
      } else {
      }
    })
  },
})