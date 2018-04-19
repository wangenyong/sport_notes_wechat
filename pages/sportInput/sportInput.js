// pages/data/data.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sportEvent: 0,
    inputEventValue: '',
    inputDataValue: '',
    historySports: []
  },

  /**
   * 选择运动项目
   */
  bindSportEventChange: function (e) {
    this.setData({
      sportEvent: e.detail.value
    })
  },

  /**
   * 输入运动项目
   */
  bindEventValueInput: function (e) {
    this.setData({
      inputEventValue: e.detail.value
    })
  },

  /**
   * 输入运动数据
   */
  bindDataValueInput: function (e) {
    this.setData({
      inputDataValue: e.detail.value
    })
  },

  /**
   * 保存数据并返回上一页
   */
  bindSaveData: function () {
    // 如果输入为空检查失败，则停止执行后续代码
    if (!this.formCheck()) {
      return
    }
    // 获取上一页对象
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];

    var obj = {};
    let str = this.data.inputEventValue.trim();
    // 判断手动输入运动项目是否为空
    if (str.length == 0) {
      obj.name = this.data.historySports[this.data.sportEvent];
    } else {
      obj.name = str;
      this.cacheSport(str);
    }
    obj.value = this.data.inputDataValue;
    var lastItems = prevPage.data.items;
    lastItems.push(obj);

    prevPage.setData({
      items: lastItems,
    })

    wx.navigateBack({
    })
  },

  /**
   * 输入数据不能为空检查
   */
  formCheck: function () {
    if (this.data.historySports.length == 0 && this.data.inputEventValue.trim() == 0) {
      wx.showToast({
        title: '请输入运动项目!',
        icon: 'none'
      })
      return false;
    }
    if (this.data.inputDataValue.trim() == 0) {
      wx.showToast({
        title: '请输入运动数据!',
        icon: 'none'
      })
      return false;
    }
    return true;
  },

  /**
   * 缓存数据
   */
  cacheSport: function (data) {
    var that = this;
    wx.getStorage({
      key: 'historySports',
      success: function(res) {
        that.setData({
          historySports: res.data
        });
        var historySports = that.data.historySports;
        var flag = true;
        for (let i in historySports) {
          if (historySports[i] == data) {
            flag = false;
          }
        };
        if (flag) {
          historySports.push(data);
        }
        wx.setStorage({
          key: 'historySports',
          data: historySports
        })
      },
      fail: function(res) {
        var historySports = that.data.historySports;
        historySports.push(data);
        wx.setStorage({
          key: 'historySports',
          data: historySports
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'historySports',
      success: function(res) {
        that.setData({
          historySports: res.data
        })
      },
      fail: function(err) {
        console.log(err);
      }
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