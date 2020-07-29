$(function() {
  let academys = ['计算机与信息学院', '数统学院', '化材学院']
  let majors = [[
    '19级计算机科学与技术',
    '18级软件工程',
    '17级物联网'
  ], [
    '19级数学专业',
    '14级数学专业',
  ], [
    '18级化学专业',
    '16级化学专业'
  ]]
  let classNum = [
    [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4]
    ],
    [
      [1, 2, 3, 4],
      [1, 2, 3, 4]
    ],
    [
      [1, 2, 3, 4],
      [1, 2, 3, 4]
    ]
  ]

  for (let i = 0; i < academys.length; i++) {
    $('#academy').append(
      '<option value='+ academys[i] +'>' + academys[i] + '</option>'
    )
  }

  let academyIndex = 0
  $('#academy').change(function () {
    //第一个不移除
    $('#major').children().not(':first').remove()

    //select province value=>index
    academyIndex = $(this).children('option:selected').index()

    // console.log(academyIndex)

    //city index from 0;
    let major = majors[academyIndex - 1]
    //循环
    for (var i = 0; i < major.length; i++) {
      $('#major').append('<option value=' + major[i] + '>' + major[i] + '</option>')
    }
  })

  let majorIndex = 0
  $('#major').change(function () {
    //第一个不移除
    $('#classNum').children().not(':first').remove()

    //select province value=>index
    majorIndex = $(this).children('option:selected').index()

    let nums = classNum[academyIndex - 1][majorIndex - 1]
    //city index from 0;
    //循环
    for (let i = 0; i < nums.length; i++) {
      $('#classNum').append('<option value=' + nums[i] + '>' + nums[i] + '</option>')
    }
  })


})
