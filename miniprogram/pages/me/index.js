
const db =wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    multiIndex: [0, 0],
    multiArray: [['A区', 'B区','C区'], ['A1', 'A2', 'A3', 'A4', 'A5','A6','A7','A8','A9']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: 'A区'
        },
        {
          id: 1,
          name: 'B区'
        },
        {
          id: 3,
          name: 'C区'
        }
      ], [
        {
          id: 0,
          name: 'A1'
        },
        {
          id: 1,
          name: 'A2'
        },
        {
          id: 2,
          name: 'A3'
        },
        {
          id: 3,
          name: 'A4'
        },
        {
          id: 4,
          name: 'A5'
        }
        ,
        {
          id: 5,
          name: 'A6'
        },
        {
          id: 6,
          name: 'A7'
        },
        {
          id: 7,
          name: 'A8'
        },
        {
          id: 8,
          name: 'A9'
        }
      ]
    ],
    openid:'',
      slschool: "",
      avatarUrl:"",
      gender: "",
      nickName: "",
    info:{},
    address:''
  },
  onLoad: function (options) {
    if(wx.getStorageSync('info')){
    this.setData({
      info:wx.getStorageSync('info')
    })
  }else{
        //调用云函数，获取openid
        wx.cloud.callFunction({
          name: 'getopenid'
        }).then((res) => {
          console.log(res)
          let openid=res.result.openid
          db.collection('app-userinfo').where({
            _openid: openid
          }).get().then((res)=>{
            console.log(res)
            this.setData({
              info:res.data[0]
            })
            wx.setStorageSync('info', res.data[0])
          })
        })
      }
      console.log(this.data.info)
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
      selected: 1
    })
  }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['A1', 'A2', 'A3', 'A4', 'A5','A6','A7','A8','A9'];
            break;
          case 1:
            data.multiArray[1] = ['B1', 'B2', 'B3正','B3侧','B4','B5','B综合北','B6','B7',
          'B8','B9'];
            break;
          case 2:
            data.multiArray[1] = ['C10', 'C11', 'C12','C13', 'C14', 'C15','C16', 'C17南', 'C17北','C18', 'C19', 'C20','C21', 'C22', 'C23','C24', 'C25', 'C26','C27', 'C28', 'C29'];
            break;
        }
        data.multiIndex[1] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  }
})