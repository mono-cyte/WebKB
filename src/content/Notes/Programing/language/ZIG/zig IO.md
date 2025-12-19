---
title: zig IO
aliases:
categories:
tags:
---

# zig IO


## stdout

```zig
// 无缓冲区
var stdout_writer = std.fs.File.stdout().writer(&.{});
const stdout = &stdout_writer.interface;

try stdout.print(format, args);

```

```zig
// 使用缓冲区, 减少io操作次数提高性能
var buf: [1024]u8 = undefined;
var stdout_writer = std.fs.File.stdout().writer(&buf);
const stdout = &stdout_writer.interface;

try stdout.print(format, args);
try stdout.flush(); // 使用缓冲区则必须手动刷新

```

## stdin

```zig

var stdin_buf: [1024]u8 = undefined;
var stdin = std.fs.File.stdin();
var reader = stdin.reader(&stdin_buf);
const ioreader = &reader.interface;
// 分开声明确保生命周期
```

```zig
// 读取行 (截取换行符防止死循环)
while (ioreader.takeDelimiterInclusive('\n')) |str| {
    std.debug.print("You typed: {s}\n", .{str});
} else |err| {
    @panic(@errorName(err));
}
```


```zig
// 读取行 - 动态大小 stream

// 使用堆内存:
var alloc = std.heap.DebugAllocator(.{}).init;
defer _ = alloc.deinit();
const da = alloc.allocator();

  
var alloc_writer = std.Io.Writer.Allocating.init(da);
defer alloc_writer.deinit();

  
while (ioreader.streamDelimiter(&alloc_writer.writer, '\n')) |_| {
    const line = alloc_writer.written();
    std.debug.print("You typed: {s}\n", .{line});
    alloc_writer.clearRetainingCapacity();
    ioreader.toss(1);
} else |err| {
    @panic(@errorName(err));
}
```