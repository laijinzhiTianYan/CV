### 程序
- windows:Xshell+Xmanager,服务器输入matlab，本地打开图形界面；
- 服务器后台运行程序nohup matlab mm.m 1>res.TXT 2>err.TXT
- nohup matlab -nodesktop -nosplash -r TDLdemo >log.txt &
- tail -f nohup.out 实时查看输出
- 查看运行情况ps -ux ; ps -aux ; htop ; jobs ; ps ;
- ps -ef | grep TDLdemo(这是我运行的matlab文件名)
- 最后，退出shell使用exit。

- tmux ls
- tmux kill-session -t tmux的名字
- tmux new-session -s name
- 划分上下两个窗格tmux split-window
- 划分左右两个窗格tmux split-window -h
- 窗口之间跳来跳去: 先按前缀(一组按键， 默认是Ctrl+b),s之后配合上下左右使用即可。
- 进入到名称为name的会话，tmux a -t  name
- 回到主对话，ctrl+b,在按d


### 保存图片  
1. saveas(subplot1,'h1.jpg');
   saveas(subplot2,'h2.jpg');
   ...
2. imshow(img,'Border','tight');
   set(gcf,'color','white','paperpositionmode','auto');
   saveas(gcf,'exprimentLightBundles.eps','psc2');
   
   imshow(img,'Border','tight');
   set(gcf,'color','white','paperpositionmode','auto');
   saveas(gcf,'example','bmp');%png等等
