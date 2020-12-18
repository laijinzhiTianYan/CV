cp_als:交替最小二乘法求张量cp分解
cp_apr:交替泊松回归求张量X的非负cp分解
cp_nmu:乘数更新求非负cp分解
khatrirao(A,B):计算具有相同列数的矩阵A和B的khatri-rao积。
sptenrand：构造稀疏均匀分布随机张量
tucker_als:HOOI(高阶正交迭代)算法做张量tucker分解
ten2mat(tensor,[tensor的维度]，mode);
mat2ten(matrix,dim,k);

@ttensor：塔克张量（分解）Class for Tucker tensors (decomposed).



**@Tensor：稠密张量**
and:张量逻辑与
or（X，Y）：
collapse：沿指定维度折叠张量
TTT(X,Y)： computes the outer product of tensors X and Y.
permute：将张量的维度换位。
double(X): converts X to a standard multidimensional array.
end:
eq(X,Y):相等
EXP(X) ：X元素的指数。
FIND(X)：返回X中非零值的下标。 returns the subscripts of the nonzero values in X.
full(X):转换为稠密张量。Convert to a (dense) tensor.
ge(X,Y):>=
gt(X,Y):>
le:<=
lt:<
ne(X,Y)：！==
not：张量的逻辑取反，非运算
innerprod(X,Y):张量内积
isscalar(X):是张量，返回0；
TF=ISSYMMETRIC（X）如果X对于其模式的每个置换都是完全对称的，则返回true
ldivide(X,Y)：X.\Y;
RDIVIDE(A,B) is called for the syntax 'A ./ B' when A or B is a tensor. A and B must have the same size, unless one is a scalar.  
**张量与向量乘积ttv**
**For tensor-matrix multiplication, use TTM.**
**For tensor-tensor multiplication, use TTT.**
**For tensor-tensor array multiplication, use TIMES or 'A .* B'.**
mtimes(A,B):tensor-scalar multiplication. MTIMES(A,B) is called for the syntax 'A * B' when A or B is a
%   tensor and the other argument is a scalar.
mttKrp:矩阵化张量乘以张量的Khatri-Rao乘积。
mttkrps:V = MTTKRPS(X,U) computes a cell array V such that  V{k} = mttkrp(X, U, k) for k = 1,...,ndims(X). 
ndims:返回张量X的维度。
nnz:张量非零元素的个数。
norm:张量的F范数
times:张量的数组乘法：矩阵A与B的哈达玛(Hadamard)积，记作A○B。
nvecs:
tensor:
 X = tensor(rand(3,4,2)) %<-- Tensor of size 3 x 4 x 2
 X = tensor(@rand, [3 4 2]) %<-- Equivalent
*tenfun:Apply a function to each element in a tensor.*
>%   Examples
  Z = tenfun(@(x)(x+1),X) %<-- increase every element by one
  Z = tenfun(@eq,X,1) %<-- logical comparison of X with scalar
  Z = tenfun(@plus,X,Y) %<-- adds the two tensors X and Y.
  Z = tenfun(@max,X,Y,Z) %<-- elementwise max over all elements in X,Y,Z
symmetrize:对称，均衡。
**@sptensor：稀疏张量。**


**@ktensor ：Kruskal张量（分解）**

**@sptenmat：稀疏张量存储为稀疏矩阵。**
TSIZE(X) returns the size of the tensor being stored as a matrix.


**@sumtensor: implicit sum of other tensors.(其他张量的隐式和)。**
T=SUMTENSOR（T1，T2，…）创建一个张量，它是其组成部分的总和。张量是隐式存储的，即每个分量都被保留。这可能会提高存储和计算效率。所有输入张量的大小必须相同，但可以是任何类型的张量。

**@symktensor：storing symmetric Kruskal tensor (decomposed).**
**@symtensor: storing only unique entries of symmetric tensor.**




@tenmat:Store tensor as a matrix.

tenmat(T,n):张量n模展开



