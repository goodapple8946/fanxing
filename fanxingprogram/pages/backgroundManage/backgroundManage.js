const db = wx.cloud.database();
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["订单管理", "房源管理", "管家管理"],
    orderInputValue:'',
    hotelInputValue: '',
    managerInputValue: '',
    activeIndex:0,
    orders:null,
    hotels:null,
    manages:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取订单信息，降序排列
    db.collection('Order')
    .limit(10)
    .orderBy('orderTime','desc')
    .get({
      success: res => {
        this.setData({
          orders: res.data
        });
    }
    });
  },

  /**
   * 点击顶部button
   */
  orderBtn() {
    this.setData({
      activeIndex: 0
    });
  },

  hotelBtn() {
    this.setData({
      activeIndex: 1
    });
  },
  
  managerBtn() {
    this.setData({
      activeIndex: 2
    });
  },

  orderSearchInput(e){
    this.setData({
      orderInputValue:e.detail.value
    })
  },
  hotelSearchInput(e) {
    this.setData({
      hotelInputValue: e.detail.value
    })
  },
  managerSearchInput(e) {
    this.setData({
      managerInputValue: e.detail.value
    })
  },

  orderSearch(){
    db.collection('Order')
      .limit(10)
      .orderBy('orderTime', 'desc')
      .get({
        success: res => {
          var results = res.data;
          var orders = [];
          for (var i = 0; i < results.length; i++) {
            if (
              //关键词
              (this.data.orderInputValue == '' ||
                results[i].hotelName.indexOf(this.data.orderInputValue) != -1 ||
                results[i].state.indexOf(this.data.orderInputValue) != -1 )
            ) {
              orders.push(results[i]);
            }
          }
          this.setData({
            orders:orders
          });
        }
      });
      console.log(this.data.orders[0].orderTime);
  },

  hotelSearch() {
    console.log("hotel");
  },

  managerSearch(){
    console.log("manager");
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})