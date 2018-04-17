// pages/sportNew/sportNew.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 开始时间
    startTime: '19:50',
    // 结束时间
    stopTime: '21:00',
    // 运动类型
    sportType: 0,
    sportArray: [
      '有氧训练',
      '上肢力量训练',
      '核心力量训练',
      '下肢力量训练',
      '球类运动',
      '户外运动',
      '其他运动'
    ],
    // 运动数据
    items: []
  },

  /**
   * 开始时间设置
   */
  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },

  /**
   * 结束时间设置
   */
  bindStopTimeChange: function (e) {
    this.setData({
      stopTime: e.detail.value
    })
  },

  /**
   * 运动类型设置
   */
  bindSportTypeChange: function (e) {
    this.setData({
      sportType: e.detail.value
    })
  },

  /**
   * 添加运动数据
   */
  bindAddDataTap: function () {
    wx.navigateTo({
      url: '../sportInput/sportInput'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.pageScrollTo({
      scrollTop: 1000
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