// chartsInit 所需数据请求

$.ajax({
  url: '/dashboard/data',
  type: 'get',
  data: null,
  dataType: 'json',
  success: function (res) {
    // console.log(data)

    if (codeManage(res.code)) {
      return 
    }

    console.log(res.submited_num)
    
    let series_data = [
      { value: res.submited_num, name: '已提交' },
      { value: res.user_students_num - res.submited_num, name: '未提交' }
    ]
    // console.log(series_data)
    
    let legend_data = ['已提交', '未提交']

    let chartDom = document.getElementById('submit_status')

    chartsInit(chartDom, series_data, legend_data, '学生提交情况')
  }
})

$.ajax({
  url: '/dashboard/health',
  type: 'get',
  data: null,
  dataType: 'json',
  success: function (res) {
    console.log(res)

    if (codeManage(res.code)) {
      return 
    }

    let forms = res.forms
    let count = []
    let health_option = res.health_option
    let option_len = health_option.length


    for (let i = 0; i < option_len; i++) {
      count[i] = 0;
    }

    for (let i = 0; i < forms.length; i++) {
      const form = forms[i];
      let health_condition = form.health_condition
      
      for (let j = 0; j < health_condition.length; j++) {
        const condition = health_condition[j];
        // console.log(condition)
        count[condition] ++;
      }
    }

    let series_data = []
    let legend_data = []

    for (let i = 0; i < option_len; i++) {
      let series_one = {
        value: count[i],
        name: health_option[i]
      }

      series_data.push(series_one)
      legend_data.push(health_option[i])
    }
    // console.log(series_data)
    // console.log(legend_data)
    
    
    
    let chartDom = document.getElementById('health_status')

    chartsInit(chartDom, series_data, legend_data, '学生健康状态')
  }
})

function chartsInit(chartDom, series_data, legend_data, title_text) {
  let chart = echarts.init(chartDom)

  option = {
    title: {
      text: title_text,
      left: 20,
      top: 20,
      textStyle: {
        color: '#bbb',
        fontSize: '20'
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      type: 'scroll',
      top: '20',
      orient: 'vertical',
      right: 10,
      bottom: 10,
      // data: ['已提交', '未提交'],
      data: legend_data
    },
    series: [
      {
        name: '表单提交情况',
        type: 'pie',
        // radius: ['60%', '80%'],
        radius: '70%',
        center: ['40%', '60%'],
        // avoidLabelOverlap: false,
        // label: {
        //   show: false,
        //   position: 'center',
        // },
        emphasis: {
          // label: {
          //   show: true,
          //   fontSize: '20',
          //   fontWeight: 'bold',
          // },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
          }
        },
        labelLine: {
          show: true,
        },
        data: series_data
      },
    ],
  }

  chart.setOption(option)
}

function codeManage(code) {
  if (code === 500) {
    window.location.href = '/500'
    return true
  } else if (code === 0) {
    // console.log('ok')
    return false
  }
}
