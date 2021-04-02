1. 使用addpath添加当前路径下所有文件夹：如果当前路径下包含较多的文件夹，一个一个添加较为麻烦，可使用addpath(genpath(pwd))一次全部添加。

2. 使用addpath('files')函数，将files文件夹添加到当前路径中。如图所示，files文件夹变色，说明已添加到当前路径中，可在其他M文件中直接调用files文件夹下的文件。

3. 添加绝对路径：

addpath（genpath（‘F:/MAJOR/PIC’））

添加相对路径：
addpath（genpath（‘PIC’））