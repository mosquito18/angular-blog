var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = './public/data/';
var send = require('./email.js');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
//发送激活邮件
router.get('/activate', function (req, res, next) {
  var email = req.param('email') || '';
  var password = req.param('password') || '';
  if (!email || !password) {
    return res.send({
      status: 0,
      info: '提交的字段不全'
    });
  }
  // 创建一个邮件对象
  var mail = {
    // 发件人
    from: 'ouxiaojie18<ouxiaojie18@126.com>',
    // 主题
    subject: '灵触分享平台',
    // 收件人
    to: email,
    // 邮件内容，HTML格式
    text: '点击激活：<a href="http://localhost:3000/activate/register?email=' + email + '&password=' + password + '"></a>' //接收激活请求的链接
  };
  try {
    send(mail);
    return res.send({
      status: 200,
      info: '发送成功'
    });
  } catch (e) {
    console.log(e);
  }
});
//注册
router.get('/activate/register', function (req, res, next) {
  //关键字段
  var email = req.param('email') || '';
  var password = req.param('password') || '';
  var id = req.param('id') || guidGenerate();
  if (!email || !password) {
    return res.send({
      status: 0,
      info: '提交的字段不全'
    });
  }
  //1)读取文件
  var filePath = PATH + 'user.json';
  fs.readFile(filePath, function (err, data) {
    if (err) {
      return res.send({
        status: 0,
        info: '读取数据失败'
      });
    }
    var arr = JSON.parse(data.toString());
    //代表每一条记录
    var obj = {
      id: guidGenerate(),
      email: email,
      password: password,
      time: new Date()
    };
    arr.splice(0, 0, obj);
    //2)写入文件
    var newData = JSON.stringify(arr);
    fs.writeFile(filePath, newData, function (err) {
      if (err) {
        res.render('login', {
          title: '登录',
          error: '激活失败！'
        });
      } else {
        res.render('login', {
          title: '登录',
          error: '激活成功请登录！'
        });
      }
    });
  });
});
//用户查询
router.get('/activate/getuser', function (req, res, next) {
  //1)读取文件
  var filePath = PATH + 'user.json';
  fs.readFile(filePath, function (err, data) {
    if (err) {
      return res.send({
        status: 0,
        info: '读取数据失败'
      });
    }
    var arr = JSON.parse(data.toString());
    var total=arr.length;
    return res.send({
      status: 200,
      info: arr,
      total:total
    });
  });
});
//粉丝查询
router.get('/activate/getfollowed', function (req, res, next) {
  var page= req.param('page')||'';
  var rows= req.param('rows')||'';
  //1)读取文件
  var filePath = PATH + 'followed.json';
  fs.readFile(filePath, function (err, data) {
    if (err) {
      return res.send({
        status: 0,
        info: '读取数据失败'
      });
    }
    var arr = JSON.parse(data.toString());
    var total=arr.length;
    if(page!=''){
      arr=paginate (arr, page, rows);
    }
    return res.send({
      status: 200,
      info: arr,
      total:total
    });
  });
});
//移除粉丝
router.get('/activate/deletefollowed', function (req, res, next) {
	var fanId = req.param('fanId') || '';
	if (!fanId) {
		return res.send({
			status: 0,
			info: '提交的字段不全'
		});
	}
	//1)读取文件
  var filePath = PATH  + 'followed.json';
	fs.readFile(filePath, function (err, data) {
		if (err) {
			return res.send({
				status: 0,
				info: '读取数据失败'
			});
		}
		var arr = JSON.parse(data.toString());

		for (var i = 0; i < arr.length; i++) {
			if (arr[i].fanId == fanId) {
				var obj = arr[i];
				arr.splice(i, 1);
			}
		}
    var total=arr.length;
		// 2)写入文件
		var newData = JSON.stringify(arr);
		fs.writeFile(filePath, newData, function (err) {
			if (err) {
				return res.send({
					status: 0,
					info: '写入文件失败'
				});
			}
			return res.send({
				status: 1,
				info: arr,
        total:total
			});
		});
	});
});
//关注查询
router.post('/activate/getfollow', function (req, res, next) {
  //1)读取文件
  var page= req.param('page')||'';
  var rows= req.param('rows')||'';
  var filePath = PATH + 'follow.json';
  fs.readFile(filePath, function (err, data) {
    if (err) {
      return res.send({
        status: 0,
        info: '读取数据失败'
      });
    }
    var arr = JSON.parse(data.toString());
    var total=arr.length;
    if(page!=''){
      arr=paginate (arr, page, rows);
    }
    
    return res.send({
      status: 200,
      info: arr,
      total:total
    });
  });
});
//添加关注
router.get('/activate/addfollow', function (req, res, next) {

	var fanId = req.param('fanId') || '';
	var fanAvatar = req.param('fanAvatar') || '';
	var fanName = req.param('fanName') || "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524715769272&di=5848d680a54f24edf61410078235536b&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3De34bc6bd6409c93d07f20effaf3cf8bb%2F2c0a077b02087bf4208ddb5af1d3572c10dfcfbb.jpg";
	var fanedId= req.param('fanedId')||'';
	if (!fanId || !fanAvatar||!fanName||!fanedId) {
		return res.send({
			status: 0,
			info: '提交的字段不全'
		});
	}
	//1)读取文件
	var filePath = PATH  + 'follow.json';
	fs.readFile(filePath, function (err, data) {
		if (err) {
			return res.send({
				status: 0,
				info: '读取数据失败'
			});
		}
		var arr = JSON.parse(data.toString());
		//代表每一条记录
		var obj = {
      id: guidGenerate(),
			fanId: fanId,
			fanAvatar: fanAvatar,
			fanName: fanName,
			fanedId:fanedId,
			time: new Date()
		};
		arr.splice(0, 0, obj);
    var total=arr.length;
		//2)写入文件
		var newData = JSON.stringify(arr);
		fs.writeFile(filePath, newData, function (err) {
			if (err) {
				return res.send({
					status: 0,
					info: '写入文件失败'
				});
			}
			return res.send({
				status: 1,
				info: arr,
        total:total
			});
		});
	});
});
//移除关注
router.get('/activate/deletefollow', function (req, res, next) {
	var fanId = req.param('fanId') || '';
	if (!fanId) {
		return res.send({
			status: 0,
			info: '提交的字段不全'
		});
	}
	//1)读取文件
  var filePath = PATH  + 'follow.json';
	fs.readFile(filePath, function (err, data) {
		if (err) {
			return res.send({
				status: 0,
				info: '读取数据失败'
			});
		}
		var arr = JSON.parse(data.toString());

		for (var i = 0; i < arr.length; i++) {
			if (arr[i].fanId == fanId) {
				var obj = arr[i];
				arr.splice(i, 1);
			}
		}
    var total=arr.length;
		// 2)写入文件
		var newData = JSON.stringify(arr);
		fs.writeFile(filePath, newData, function (err) {
			if (err) {
				return res.send({
					status: 0,
					info: '写入文件失败'
				});
			}
			return res.send({
				status: 1,
				info: arr,
        total:total
			});
		});
	});
});

//热度查询
router.get('/activate/gethot', function (req, res, next) {
  //1)读取文件
  var filePath = PATH + 'hot.json';
  fs.readFile(filePath, function (err, data) {
    if (err) {
      return res.send({
        status: 0,
        info: '读取数据失败'
      });
    }
    var arr = JSON.parse(data.toString());
    var total=arr.length;
    return res.send({
      status: 200,
      info: arr,
      total:total
    });
  });
});
//添加评论
router.post('/activate/addhot', function (req, res, next) {

	var ownId = req.param('ownId') || 1;
	var postId = req.param('postId') || '';
	var postName = req.param('postName') || '';
	var friendId= req.param('friendId')||'';
  var friendAvatar = req.param('friendAvatar') || '';
	var friendName= req.param('friendName')||'';
	var like= req.param('like')||false;
  var recommend = req.param('recommend') || false;
	// if (!useId || !content||!imgs||!tags) {
	// 	return res.send({
	// 		status: 0,
	// 		info: '提交的字段不全'
	// 	});
	// }
	//1)读取文件
	var filePath = PATH  + 'hot.json';
	fs.readFile(filePath, function (err, data) {
		if (err) {
			return res.send({
				status: 0,
				info: '读取数据失败'
			});
		}
		var arr = JSON.parse(data.toString());
		//代表每一条记录
		var obj = {
      id: guidGenerate(),
			ownId: ownId,
			postId: postId,
			postName: postName,
			friendId:friendId,
      friendAvatar:friendAvatar,
      friendName:friendName,
      like:like,
      recommend:recommend,
			time: new Date()
		};
		arr.splice(0, 0, obj);
    var total=arr.length;
		//2)写入文件
		var newData = JSON.stringify(arr);
		fs.writeFile(filePath, newData, function (err) {
			if (err) {
				return res.send({
					status: 0,
					info: '写入文件失败'
				});
			}
			return res.send({
				status: 1,
				info: arr,
        total:total
			});
		});
	});
});
//喜欢文章查询
router.get('/activate/getlikeposts', function (req, res, next) {
  //1)读取文件
  var filePath = PATH + 'likeposts.json';
  fs.readFile(filePath, function (err, data) {
    if (err) {
      return res.send({
        status: 0,
        info: '读取数据失败'
      });
    }
    var arr = JSON.parse(data.toString());
    var total=arr.length;
    return res.send({
      status: 200,
      info: arr,
      total:total
    });
  });
});
//私信查询
router.get('/activate/getmessage', function (req, res, next) {
  //1)读取文件
  var filePath = PATH + 'message.json';
  fs.readFile(filePath, function (err, data) {
    if (err) {
      return res.send({
        status: 0,
        info: '读取数据失败'
      });
    }
    var arr = JSON.parse(data.toString());
    var total=arr.length;
    return res.send({
      status: 200,
      info: arr,
      total:total
    });
  });
});

//我的文章查询
router.get('/activate/getposts', function (req, res, next) {
  //1)读取文件
  var filePath = PATH + 'posts.json';
  fs.readFile(filePath, function (err, data) {
    if (err) {
      return res.send({
        status: 0,
        info: '读取数据失败'
      });
    }
    var arr = JSON.parse(data.toString());
    var total=arr.length;
    return res.send({
      status: 200,
      info: arr,
      total:total
    });
  });
});
//添加我的文章
router.post('/activate/addposts', function (req, res, next) {

	var useId = req.param('useId') || 1;
	var content = req.param('content') || '';
	var imgs = req.param('imgs') || ["../../assets/avatar/avatar1.png"];
	var tags= req.param('tags')||'';
	// if (!useId || !content||!imgs||!tags) {
	// 	return res.send({
	// 		status: 0,
	// 		info: '提交的字段不全'
	// 	});
	// }
	//1)读取文件
	var filePath = PATH  + 'posts.json';
	fs.readFile(filePath, function (err, data) {
		if (err) {
			return res.send({
				status: 0,
				info: '读取数据失败'
			});
		}
		var arr = JSON.parse(data.toString());
		//代表每一条记录
		var obj = {
      id: guidGenerate(),
			useId: useId,
			content: content,
			imgs: imgs,
			tags:tags,
      hot:0,
      comments:0,
			time: new Date()
		};
		arr.splice(0, 0, obj);
    var total=arr.length;
		//2)写入文件
		var newData = JSON.stringify(arr);
		fs.writeFile(filePath, newData, function (err) {
			if (err) {
				return res.send({
					status: 0,
					info: '写入文件失败'
				});
			}
			return res.send({
				status: 1,
				info: arr,
        total:total
			});
		});
	});
});
function paginate (array, page, rows){
    --page;
    return array.slice(page * rows, (page + 1) * rows);
};
function guidGenerate() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).toUpperCase();
}
module.exports = router;
