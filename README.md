# Bitcron-Theme-Motify

![screenshot.jpg](https://raw.githubusercontent.com/lmm214/Bitcron-Theme-Motify/master/bitcron-motify.jpg)

### 主题简介

自扒 WordPress 同名主题，支持：

- 头部背景自定义
- “相册”、“一句话”特色文章样式
- 社交图标包含：Twitter、Instagram、Github、Flickr、微博、Facebook。

### 头部背景

后台 `Dashboard → Images → Default Background`

### “一句话”文章使用

在文章中加入这个 `metadate` 即可

>format: chat

头像设置：`Dashboard → Images → Avatar`

### “相册”文章使用

在文章中加入以下 `metadate`

>format: photo
path: lxy
width: 250

`path: lxy` 表示此文调取的图片在根目录 `/_photos/lxy` 里。所以，需要在根目录 **新建文件夹** `_photos` 并在其中再建文件夹 `lxy`。

`width: 250` 可选，文章内页瀑布流显示的 **每一列** 即每张图片的宽度。（首页默认缩略图显示，且不显示文章内容。）

注：如需更改 `_photos` 这个文件夹，相关代码在 `index.jade` 和 `post.jade` 中：

```jade
- var metapath = "/_photos/"+ post.metadata.path
```

### 社交图标使用

`Dashboard → 常规`，如需增加 “Twitter、Instagram、Github、Flickr、微博、Facebook ” 之外的图标，可访问 <https://icomoon.io/app/>  进一步处理。
