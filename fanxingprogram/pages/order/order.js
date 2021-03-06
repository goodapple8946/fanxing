const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    topIndex: 0,
    user: null,
    orders: null
  },
  onLoad() {
    //用户数据
    if (app.globalData.user) {
      this.setData({
        user: app.globalData.user
      });
      this.topBtn0();
    }
    else {
      //防止onLaunch在onLoad之后返回
      app.queryUserOrder = x => {
        this.setData({
          user: x
        });
      }
      this.topBtn0();
    }
  },
  topBtn0() {
    //全部
    db.collection('Order').where({
      _openid: this.data.user._openid
    }).get({
      success: res => {
        this.setData({
          orders: res.data
        });
      },
      fail: res => {
        wx.showToast({
          title: '订单数据获取失败',
          icon: 'none'
        })
      }
    });
    this.setData({
      topIndex: 0
    });
  },
  topBtn1() {
    //待入住
    db.collection('Order').where({
      _openid: this.data.user._openid,
      state: '待入住'
    }).get({
      success: res => {
        this.setData({
          orders: res.data,
          topIndex: 1
        });
      },
      fail: res => {
        wx.showToast({
          title: '订单数据获取失败',
          icon: 'none'
        })
      }
    });
  },
  topBtn2() {
    //已入住
    db.collection('Order').where({
      _openid: this.data.user._openid,
      state: '已入住'
    }).get({
      success: res => {
        this.setData({
          orders: res.data,
          topIndex: 2
        });
      }
    });
  },
  topBtn3() {
    //已离店
    db.collection('Order').where({
      _openid: this.data.user._openid,
      state: '已离店'
    }).get({
      success: res => {
        this.setData({
          orders: res.data,
          topIndex: 3
        });
      },
      fail: res => {
        wx.showToast({
          title: '订单数据获取失败',
          icon: 'none'
        })
      }
    });
  },
  topBtn4() {
    //已取消
    db.collection('Order').where({
      _openid: this.data.user._openid,
      state: '已取消'
    }).get({
      success: res => {
        this.setData({
          orders: res.data,
          topIndex: 4
        });
      },
      fail: res => {
        wx.showToast({
          title: '订单数据获取失败',
          icon: 'none'
        })
      }
    });
  }
})