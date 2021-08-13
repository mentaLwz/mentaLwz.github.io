---
title: "聊聊linux top 命令"
date: 2021-08-13T22:12:36+08:00
draft: true
---

工作中top命令还是挺常用到的，主要是用来看看系统的负载。但是对于里面的很多参数其实没有很清楚。这次做个总结。

### top 界面
```
top - 22:18:39 up 19 min,  3 users,  load average: 0.00, 0.01, 0.00
Tasks:  24 total,   1 running,  23 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem : 13048524 total, 11997596 free,   185760 used,   865168 buff/cache
KiB Swap:  4194304 total,  4194304 free,        0 used. 12597892 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND                                                                           
22141 mentalwz  20   0   42112   3536   3092 R   0.3  0.0   0:00.01 top                                                                               
    1 root      20   0   77836   8900   6604 S   0.0  0.1   0:00.49 systemd
   46 root      19  -1   94656  13188  12628 S   0.0  0.1   0:00.09 systemd-journal
   52 root      20   0   42784   4120   2996 S   0.0  0.0   0:00.16 systemd-udevd
   58 systemd+  20   0   71720   5064   4556 S   0.0  0.0   0:00.02 systemd-network
  162 message+  20   0   50064   4440   3840 S   0.0  0.0   0:00.16 dbus-daemon
  230 root      20   0   82140   4048   3488 S   0.0  0.0   0:00.00 login
  463 root      20   0   70468   5916   5264 S   0.0  0.0   0:00.11 systemd-logind
  504 mentalwz  20   0   76676   7640   6540 S   0.0  0.1   0:00.02 systemd
  508 mentalwz  20   0  111452   2068     44 S   0.0  0.0   0:00.00 (sd-pam)
  553 mentalwz  20   0   54132   6348   4452 S   0.0  0.0   0:00.05 zsh
 1345 root      20   0   72308   5672   4940 S   0.0  0.0   0:00.00 sshd
```

后面开始一个个参数介绍，结合man pages和google。

### load average 
第一行`load average: 0.00, 0.01, 0.00`
有3个数字`0.00, 0.01, 0.00`, 分别代表最近1分钟，5分钟，15分钟的平均负载。问题是平均负载具体指啥呢？在man pages中uptime命令的描述有：
```
 System load averages is the average number of processes that are either in a runnable or uninterruptable state.  A process in a runnable  state  is  either using the CPU or waiting to use the CPU.  A process in uninterruptable state is waiting for some I/O access, eg waiting for disk.  The averages are taken over the three time intervals.  Load averages are not normalized for the number of CPUs in a system, so a load average of 1 means  a  single CPU system is loaded all the time while on a 4 CPU system it means it was idle 75% of the time.
```
system load averages 是处于可运行状态（runnable state）和不可打断状态（uninterruptable state）的进程数量。可运行状态的进程是正在使用cpu或等待cpu。处于不可打断状态的进程是在等待某些io获取，比如说磁盘。load averages 没有用所有cpu核心数去平均，所以 1 load averages表示一个单cpu系统处于满负载状态，而在4cpu的系统上则是75%的时间处于idle态。
通俗地说，load averages可以理解为满载工作的cpu核心数。

### Task
第二行：`Tasks:  24 total,   1 running,  23 sleeping,   0 stopped,   0 zombie`
如果Task指的是运行的进程数量，分为4个状态`running sleeping stopped zombie`
按`shift + h`，则会显示为线程如下：
```
Threads:  83 total,   1 running,  82 sleeping,   0 stopped,   0 zombie
```
另外关注下man-pages上的描述
```
    This portion consists of a minimum of two lines.  In an SMP environment, additional lines can reflect individual CPU state percentages.

    Line 1 shows total tasks or threads, depending on the state of the Threads-mode toggle.  That total is further classified as:
        running; sleeping; stopped; zombie

    Line 2 shows CPU state percentages based on the interval since the last refresh.        
```
SMP environment指的是啥？查了下wiki
```
Symmetric multiprocessing or shared-memory multiprocessing[1] (SMP) involves a multiprocessor computer 
hardware and software architecture where two or more identical processors are connected to a single, 
shared main memory, have full access to all input and output devices, and are controlled by a single 
operating system instance that treats all processors equally, reserving none for special purposes. Most 
multiprocessor systems today use an SMP architecture. In the case of multi-core processors, the SMP 
architecture applies to the cores, treating them as separate processors.
```
zh-wiki上比较好理解:
```
对称多处理（英语：Symmetric multiprocessing，缩写为 SMP），也译为均衡多处理、
对称性多重处理、对称多处理机[1]，是一种多处理器的电脑硬件架构，在对称多处理架构下，
每个处理器的地位都是平等的，对资源的使用权限相同。现代多数的多处理器系统，都采用对
称多处理架构，也被称为对称多处理系统（Symmetric multiprocessing system）。在这个
系统中，拥有超过一个以上的处理器，这些处理器都连接到同一个共享的主存上，并由单一
操作系统来控制。在多核心处理器的例子中，对称多处理架构，将每一个核心都当成是独立的处理器。

在对称多处理系统上，在操作系统的支持下，无论行程是处于用户空间，或是核心空间，都可以分配到任何一个处理器上运行。因此，行程可以在不同的处理器间移动，达到负载平衡，使系统的效率提升。
```
另外google到了一些拓展：
[服务器体系(SMP, NUMA, MPP)与共享存储器架构(UMA和NUMA)](https://cloud.tencent.com/developer/article/1372348)


### CPU States
紧接着Task 下面的就是cpu states
```
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
```
man上的说明也很详细：
```shell
    us, user    : time running un-niced user processes       // 非niced的用户态进程占的cpu时间
    sy, system  : time running kernel processes              // 内核态进程占的cpu时间
    ni, nice    : time running niced user processes          // niced的用户态进程占的cpu时间
    id, idle    : time spent in the kernel idle handler      // 内核挂起占用的cpu时间（即空闲）
    wa, IO-wait : time waiting for I/O completion            // 等待io完成占用的cpu时间
    hi : time spent servicing hardware interrupts            // 软中断占用的cpu时间
    si : time spent servicing software interrupts            // 硬中断占用的cpu时间
    st : time stolen from this vm by the hypervisor          // ?
```
idle 有个解释很清楚[what-does-an-idle-cpu-process-do](https://unix.stackexchange.com/questions/361245/what-does-an-idle-cpu-process-do)  
`st : time stolen from this vm by the hypervisor` 指的是啥？
[一个解释](https://unix.stackexchange.com/questions/18918/linux-top-command-what-are-us-sy-ni-id-wa-hi-si-and-st-for-cpu-usage)：
```
"steal time", is only relevant in virtualized environments. It represents time when the real CPU was not available to the current virtual machine — it was "stolen" from that VM by the hypervisor (either to run another VM, or for its own needs).
```
我的理解是只有当前系统是虚拟环境这个参数才有意义，表示的是真实cpu不可用占的百分比。即被hypervisor(虚拟机监视器)所偷走的cpu时间。