# Form Inserter 

一款用于自动向表单中插入预定义payload 的FireFox浏览器插件

## 使用方法

step1 添加你的payload 

![](img/1.jpg)

step2. 打开右键菜单，选择payload name, 插件便会自动向当前页面所有的input框和textarea框插入对应的payload  

![](img/2.jpg) 


如果当前用户选中的是一个input框/textarea框，则只会在选中的input/textarea 框中插入payload。

## 参与开发

方法一:
```
about:debugging 
```
点击 临时加载附加组件，选中你开发的插件的 mainfest.json 文件即可


方法二:
```
sudo npm install --global web-ext
```
```
web-ext run 
```