Component({
  properties: {
    managerApplication: {
      type: Object,
      value: null
    },
    user: {
      type: Object,
      value: null
    }
  },
  methods: {
    //通过申请
    pass() {
      wx.showModal({
        title: '提示',
        content: '通过该管家申请？',
        success: res => {
          if (res.confirm) {
            wx.cloud.callFunction({
              name: 'updateManagerApplication',
              data: {
                doc: this.properties.managerApplication._id,
                state: 'pass'
              },
              success: res => {
                console.log('update ManagerApplication');
                wx.cloud.callFunction({
                  name: 'updateUserRole',
                  data: {
                    doc: this.properties.managerApplication.userId,
                    role: 'manager'
                  },
                  success: res => {
                    console.log('update User');
                    wx.showToast({
                      title: '已通过',
                    });
                    var page = getCurrentPages().pop();
                    page && page.refreshManagerApplication();
                  }
                });
              },
              fail: res => {
                wx.showToast({
                  title: '通过管家申请失败',
                  icon: 'none'
                })
              }
            });
          }
        }
      })
    },
    //拒绝申请
    refuse() {
      wx.showModal({
        title: '提示',
        content: '拒绝该管家申请？',
        success: res => {
          if (res.confirm) {
            wx.cloud.callFunction({
              name: 'updateManagerApplication',
              data: {
                doc: this.properties.managerApplication._id,
                state: 'refuse'
              },
              success: res => {
                console.log('update ManagerApplication');
                wx.showToast({
                  title: '已拒绝',
                  icon: 'none'
                });
                var page = getCurrentPages().pop();
                page && page.refreshManagerApplication();
              },
              fail: res => {
                wx.showToast({
                  title: '拒绝管家申请失败',
                  icon: 'none'
                })
              }
            });
          }
        }
      })
    }
  }
})
