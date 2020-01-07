
// options = {
//   url: "",
//   method: "",
//   headers: {}, 
//   data: "",
//   success: function(result) {},  // 请求成功后调用此方法
//   fail: function(error) {}    // 请求失败或出错后调用此方法
// }

window.ajax = function (options) {
  ajaxOptions = {
    url: options.url || "",
    method: options.method.toLocaleUpperCase() || 'GET',
    headers: options.headers || {}, 
    data: options.data || null,
    success: options.success || function(result) {},  // 请求成功后调用此方法
    fail: options.fail || function(error) {}    // 请求失败或出错后调用此方法
  };

  var xhr = new XMLHttpRequest();

  // xhr.onreadystatechange = function() {
  //   if (xhr.readyState == 4) {
  //     if (xhr.status == 200 || (xhr.status == 201 && 'POST' === ajaxOptions.method)) {
  //       ajaxOptions.success(JSON.parse(xhr.responseText));
  //     } else {
  //       ajaxOptions.fail();
  //     }
  //   }
  // };
  xhr.open(ajaxOptions.method, ajaxOptions.url, true);
  
  if ('POST' === ajaxOptions.method || 'PUT' === ajaxOptions.method) {
    xhr.setRequestHeader('content-type', 'application/json');
    ajaxOptions.data = JSON.stringify(ajaxOptions.data);
  }

  xhr.onerror = () => ajaxOptions.fail(xhr.status);
  xhr.onload = () => ajaxOptions.success(JSON.parse(xhr.responseText));

  xhr.send(ajaxOptions.data);
}