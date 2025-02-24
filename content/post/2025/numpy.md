---
date: '2025-02-24T13:15:11+08:00'
draft: true
title: 'Numpy'
---

1. 什么是 NumPy？

NumPy（Numerical Python）是 Python 中一个开源的数学库，提供了强大的多维数组对象 ndarray 和对这些数组进行操作的函数。它是数据分析、机器学习、深度学习等领域的基础库。

2. 安装 NumPy

你可以通过以下命令来安装 NumPy：
```bash
pip install numpy
```

3. ndarray：核心数据结构

NumPy 的核心是 ndarray(nd 代表 N-dimensional)，意思是 N 维数组，可以存储同类型的数据。ndarray 允许你执行各种数组运算（如加法、乘法等），而且速度比 Python 原生的 list 要快得多。


```python
import numpy as np

# 从列表创建一维数组
arr_1d = np.array([1, 2, 3, 4, 5])
print(arr_1d)  # 输出: [1 2 3 4 5]

# 从嵌套列表创建二维数组
arr_2d = np.array([[1, 2, 3], [4, 5, 6]])
print(arr_2d)
# 输出:
# [[1 2 3]
#  [4 5 6]]

print(type(arr_2d))
```

    [1 2 3 4 5]
    [[1 2 3]
     [4 5 6]]
    <class 'numpy.ndarray'>


数组的属性
- shape: 数组的形状。
- ndim: 数组的维数。
- size: 数组中元素的总数。
- dtype: 数组中元素的数据类型。


```python
print(arr_2d.shape)  # 输出: (2, 3)
print(arr_2d.ndim)   # 输出: 2
print(arr_2d.size)   # 输出: 6
print(arr_2d.dtype)  # 输出: int64（根据系统不同，可能会有所不同）
```

    (2, 3)
    2
    6
    int64


4. 数组运算

NumPy 数组支持直接的数学运算，这使得你可以方便地进行加法、减法、乘法、除法等操作。



```python
'''数字加法'''
arr = np.array([1, 2, 3])
result = arr + 5  # 每个元素加 5
print(result)  # 输出: [6 7 8]
```

    [6 7 8]



```python
'''数组之间的运算'''
arr1 = np.array([1, 2, 3])
arr2 = np.array([4, 5, 6])
result = arr1 + arr2  # 对应位置元素相加
print(result)  # 输出: [5 7 9]
```

    [5 7 9]



```python
'''矩阵乘法（点积）'''
arr1 = np.array([1, 2])
arr2 = np.array([3, 4])
result = np.dot(arr1, arr2)  # 点积
print(result)  # 输出: 11
```

    11



```python
'''广播机制

当不同形状的数组进行运算时，NumPy 会自动调整数组的形状，这称为广播。比如：'''

arr1 = np.array([1, 2, 3])
arr2 = np.array([4])
result = arr1 + arr2  # arr2 会被广播成 [4, 4, 4]
print(result)  # 输出: [5 6 7]
```

    [5 6 7]


5. 数组的切片与索引

NumPy 支持非常灵活的切片操作，让你可以方便地提取数组的一部分。


```python
'''一维数组切片'''
arr = np.array([1, 2, 3, 4, 5])
print(arr[1:4])  # 输出: [2 3 4]
```

    [2 3 4]



```python
'''多维数组切片'''
arr_2d = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(arr_2d[1:, :2])  # 输出: [[4 5]
                       #          [7 8]]
```

    [[4 5]
     [7 8]]



```python
'''布尔索引

你可以使用布尔条件来选择数组中的元素。'''
arr = np.array([1, 2, 3, 4, 5])
result = arr[arr > 2]  # 获取大于 2 的元素
print(result)  # 输出: [3 4 5]
```

    [3 4 5]


6. 常用函数

NumPy 提供了很多有用的数学函数，可以帮助你快速处理数据。


```python
'''数学运算'''
arr = np.array([1, 2, 3])
print(np.sin(arr))  # 求正弦函数，输出: [0.84147098 0.90929743 0.14112001]
print(np.log(arr))  # 求对数，输出: [0.         0.69314718 1.09861229]
```

    [0.84147098 0.90929743 0.14112001]
    [0.         0.69314718 1.09861229]


生成数组
- np.arange(start, stop, step)：生成一个等间隔的数组。
- np.linspace(start, stop, num)：生成指定个数的均匀分布的数组。

随机数生成

NumPy 提供了生成随机数的工具：
```python
random_arr = np.random.rand(3, 2)  # 生成一个 3x2 的数组，元素为 [0, 1) 区间的随机数
print(random_arr)
```
