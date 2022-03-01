import formatTime from "../../utils/formatTime"
let userInfo = {}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    faxian:{
      type:Object
    }
  },
  externalClasses:[
    'iconfont',
    'icon-fenxiang',
    'icon-pinglun'
  ],
observers:{
  ['faxian.createTime'](val){
    if(val){
      this.setData({
        time:  formatTime(new Date(val))

      })
      
    }
  }

},
  /**
   * 组件的初始数据
   */
  data: {
    time:'',
    open:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openurl(){
      this.setData({
        open:!this.data.open
      })
      console.log(this.data.open)
    },
    scroll(e) {
      console.log(e)
    },
    pre(event){
      console.log(event)
      wx.previewImage({
        urls: event.target.dataset.src,
        current: event.target.dataset.url
      })
    },
    onComment(){
      wx.getSetting({
        success:(res)=>{
          if(res.authSetting['scope.address.userInfo']){
            wx.getUserInfo({
              success: (res)=>{
                userInfo =res.userInfo
              }
            })
          }else{
            this.setData()
          }
        }
      })
    },
  }
})
