// pages/sportNew/sportNew.js

var util = require('../../utils/util.js')
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '',
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
    items: [],
    loading: false,
    sessionId: ''
  },

  /**
   * 训练日期设置
   */
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
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
   * 保存运动数据
   */
  bindSaveDataTap: function () {
    if (this.data.items.length == 0) {
      wx.showToast({
        title: '请添加运动数据 :)',
        icon: 'none'
      })
      return
    }
    this.setData({
      loading: true
    })
    var time = this.calculateDuration()
    var that = this
    wx.request({
      url: 'https://wangenyong.com/sports',
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'sessionId': that.data.sessionId
      },
      data: {
        date: new Date(that.data.date),
        category: that.data.sportArray[that.data.sportType],
        duration: time.duration,
        duration_suffix: time.duration_suffix,
        datasets: that.data.items
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode != 200) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        } else {
          // 设置上一个页面刷新数据
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          prevPage.setData({
            refresh: true
          });
          wx.navigateBack({
          })
        }
      },
      fail: function (err) {
        console.log(err);
      },
      complete: function () {
        that.setData({
          loading: false
        })
      }
    })
  },

  /**
   * 计算时间间隔
   */
  calculateDuration: function () {
    var startTime = new Date(this.data.date + " " + this.data.startTime);
    var stopTime = new Date(this.data.date + " " + this.data.stopTime);
    var duration = (stopTime.getTime() - startTime.getTime()) / 1000 / 60;
    var duration_suffix = "分钟";
    if (duration >= 60) {
      duration = (duration / 60).toFixed(1);
      duration_suffix = "小时";
    }
    return {
      duration: duration,
      duration_suffix: duration_suffix
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.sessionId) {
      this.setData({
        sessionId: app.globalData.sessionId
      })
    }

    var date = util.formatDate(new Date());
    this.setData({
      date: date
    })
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