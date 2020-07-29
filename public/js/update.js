$.ajax({
  url: '/lastFormdata',
  type: 'get',
  data: null,
  dataType: 'json',
  success: function (data) {
    if (data.code === 500) {
      window.location.href = '/500'
    } else {
      // console.log(formdata)
      formInit(data)
    }
    
  }
})

function formInit(data) {
  let formdata = data.formdata
  let health_option = data.health_option

  let location = document.querySelectorAll('#location select')
  let unit = document.querySelectorAll('#unit input')
  let health_condition = document.querySelectorAll('#health_condition input')

  // console.log(location)
  // console.log(unit)
  // console.log(health_condition)

  // let locationData = new Array
  // locationData.push(formdata.province)
  // locationData.push(formdata.city)
  // locationData.push(formdata.area)

  let provinceDom = document.getElementById('province')
  let cityDom = document.getElementById('city')
  let areaDom = document.getElementById('area')

  provinceDom.setAttribute('data-province', formdata.province)
  cityDom.setAttribute('data-city', formdata.city)
  areaDom.setAttribute('data-district', formdata.area)

  // for (let i = 0; i < location.length; i++) {
  //   location[i].innerHTML = '<option value="">' +  locationData[i]  + '</option>'
  // }

  for (let i = 0; i < unit.length; i++) {
    if (unit[i].defaultValue === formdata.unit) {
      unit[i].setAttribute('checked', 'true')
    }
  }

  // console.log(formdata.health_condition)
  
  for (let j = 0; j < formdata.health_condition.length; j++) {
    health_condition[formdata.health_condition[j]].setAttribute('checked', true)
  }
}

$('#health_form').on('submit', (e) => {
  e.preventDefault()
  
  if (checkboxCheck()) {
    let formData = $('#health_form').serialize()
    // console.log(formData)
    $.ajax ({
      url: '/update',
      type: 'post',
      data: formData,
      dataType: 'json',
      success: (data) => {
        let code = data.code
        if (code === 500) {
          window.location.href = '/500'
        } else if (code === 0) {
          alert('更新成功')
          window.location.href = '/formpage'
        }
      }
    })
  }
})

function checkboxCheck() {
  var checkOne = false
  var checkBox = document.querySelectorAll('input[name="health_condition"]') //获得得到所的复选框
  var checkArr = Array.from(checkBox) //将类数组转为数组
  
  checkArr.forEach((item) => {
    if (item.checked) {
      checkOne = true
    }
  })

  if (!checkOne) {
    $('#test').popover('show')

    setTimeout(() => {
      $('#test').popover('destroy')
    }, 2000)

    return false
  }
  return true
}
