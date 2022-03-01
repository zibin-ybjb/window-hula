Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/images/首页.png",
      },
      {
        pagePath: "/pages/faxian/index",
        iconPath: "/images/发现.png",
      }, {
        pagePath: "/pages/me/index",
        iconPath: "/images/我的.png",
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      console.log(data.path);
      const url = data.path;
      console.log(e);
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})