// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
  var vars = [],
    hash
  var hashes = window.location.href
    .slice(window.location.href.indexOf('?') + 1)
    .split('&')
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=')
    vars.push(hash[0])
    vars[hash[0]] = hash[1]
  }
  return vars
}

function getOs() {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.indexOf('win') != -1) {
    return 'Windows'
  } else if (ua.indexOf('mac') != -1) {
    return 'Macintosh'
  } else if (ua.indexOf('linux') != -1) {
    return 'Linux'
  } else if (ua.indexOf('x11') != -1) {
    return 'Unix'
  } else {
    return 'Computers'
  }
}

$(document).ready(function () {
  var code = getUrlVars()['code']
  if (code != null) {
    $('#btn_copy').show()
    var clipboard = new ClipboardJS('#btn_copy', {
      text: function () {
        return code.split('#').shift()
      },
    })

    clipboard.on('success', function (e) {
      $('#btn_copy').text('授权码已经复制')
      setTimeout(function () {
        $('#btn_copy').text('点击复制授权码')
      }, 5000)
    })
  }

  var os = getOs()
  var version = '1.0.7'
  var link = null
  var arch = null

  switch (os) {
    case 'Windows':
      arch = 'windows_64'
      link = `https://download.whaleniu.cn/download/flavor/default/${version}/windows_64/鲸牛电商搬家助手 Setup ${version}.exe`
      break
    case 'Macintosh':
      arch = 'osx_arm64'
      link = `https://download.whaleniu.cn/download/flavor/default/${version}/osx_arm64/鲸牛电商搬家助手-${version}.dmg`
      break
    default:
      break
  }

  if (arch == null) {
    $('.link_download').hide()
  } else {
    $('.link_download').attr('href', link).html(`点击下载 v${version}`)
  }
})
