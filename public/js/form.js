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

$('#health_form').on('submit', (e) => {
  e.preventDefault()
  
  if (checkboxCheck()) {
    let formData = $('#health_form').serialize()
    console.log(formData)
    $.ajax ({
      url: '/formpage',
      type: 'post',
      data: formData,
      dataType: 'json',
      success: (data) => {
        // console.log(data)
        if (data.code === 1) {
          alert('您已提交')
        } 
        alert('提交成功')
        window.location.href = '/formpage'
      }
    })
  }
})
