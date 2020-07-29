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
      // console.log(data)
      
      formInit(data)
    }
    
  }
})

function formInit(data) {
  let formdata = data.formdata

  // console.log(formdata)
  

  let location = document.querySelectorAll('#location select')
  let unit = document.querySelectorAll('#unit input')
  let health_condition = document.querySelectorAll('#health_condition input')

  // console.log(location)
  // console.log(unit)
  // console.log(health_condition)

  let locationData = new Array
  locationData.push(formdata.province)
  locationData.push(formdata.city)
  locationData.push(formdata.area)

  // let provinceDom = document.getElementById('province')
  // let cityDom = document.getElementById('city')
  // let areaDom = document.getElementById('area')

  // provinceDom.setAttribute('data-province', formdata.province)
  // cityDom.setAttribute('data-city', formdata.city)
  // areaDom.setAttribute('data-district', formdata.area)

  for (let i = 0; i < location.length; i++) {
    location[i].innerHTML = '<option value="">' +  locationData[i]  + '</option>'
  }

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

// $('#button_update').on('click', (e) => {
//   e.preventDefault()

//   let location = document.querySelectorAll('#location select')
//   let unit = document.querySelectorAll('#unit input')
//   let health_condition = document.querySelectorAll('#health_condition input')

//   console.log('我被点啦~~')
  
  
//   for (let i = 0; i < location.length; i++) {
//     location[i].removeAttribute('disabled')
//   }

//   for (let i = 0; i < unit.length; i++) {
//     unit[i].removeAttribute('disabled')
//   }

//   for (let i = 0; i < health_condition.length; i++) {
//     health_condition[i].removeAttribute('disabled')
//   }

//   let button_submit = $('#button_submit')
//   button_submit.css({
//     'display': 'inline'
//   })

//   $('#button_update').css({
//     'display': 'none'
//   })
// })

