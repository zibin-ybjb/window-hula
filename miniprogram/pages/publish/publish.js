const maxi = 3
const db = wx.cloud.database()
// 输入的文字内容
let content = ''
let userInfo = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottom: 50,
    index:0,
    images:[],
    select:true
  },
  send(){
    this.setData({
      index:1
    })
    if (content.trim() === '') {
      wx.showModal({
        title: '请输入内容',
        content: '',
      })
      return
    }

    wx.showLoading({
      title: '发布中',
      mask: true,
    })

    let promiseArr = []
    let fileIds = []
    for(let i=0;i<this.data.images.length;i++){
      let p = new Promise((resolve, reject) => {
      let item = this.data.images[i]
      let suff = /\.\w+$/.exec(item)[0]
      wx.cloud.uploadFile({
        cloudPath: 'faxian/'+Date.now()+'-'+Math.random()*1000000+ suff,
        filePath: item ,
        success:(res)=>{
          fileIds = fileIds.concat(res.fileID)
          // console.log(res)
          resolve()
        }, 
        fail:(err)=>{
          console.log(err)
          reject()
        }
      })
    })
    promiseArr.push(p)
    }
    Promise.all(promiseArr).then((res) => {
      db.collection('faxian').add({
        data: {
          ...userInfo,
          content,
          img: fileIds,
          createTime: db.serverDate(), // 服务端的时间
        }
      }).then((res) => {
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
        })

        // 返回blog页面，并且刷新
        wx.navigateBack()
        const pages = getCurrentPages()
        // console.log(pages)
        // 取到上一个页面
        const prevPage = pages[pages.length - 2]
        prevPage.onPullDownRefresh()
      })
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: '发布失败',
      })
    })
  },
  onPut(event){
    // console.log(event.detail.value)
    let wordNum = event.detail.value.length
    console.log(wordNum)
    content = event.detail.value
  },
  onFocus(event){
    // console.log(event.detail.height)
    let num =event.detail.height+15
    this.setData({
      bottom:num
    })
  },
  choose(){
    let max  = maxi - this.data.images.length
    wx.chooseImage({
      count: max,
      sizeType:['original',"compressed"],
      sourceType:['album'],
      success: (res)=>{
        // console.log(res)
        this.setData({
          images:this.data.images.concat(res.tempFilePaths)
        })
       let  max2 = maxi-this.data.images.length
       this.setData({
         select: max2<=0? false : true
       })
      
      }
    })
  },
  onBlur(event){
    this.setData({
      bottom:50
    })
  },
  delete(event){
    // console.log(event)
    let index = event.currentTarget.
    dataset.
    index
    this.data.images.splice(index,1)
    this.setData({
      images:this.data.images
    })
    if(this.data.images.length==maxi-1){
      this.setData({
        select:true
      })
    }
  },
  pre(event){
    wx.previewImage({
      urls: this.data.images,
      current:event.target.dataset.src
    })
  },
  onLoad: function (options) {
    // console.log(options)
    userInfo = options
  },


  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  }
})