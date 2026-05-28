import base64, os

def img_to_b64(path):
    with open(path, 'rb') as f:
        return base64.b64encode(f.read()).decode()

car1 = img_to_b64('D:/素材/Claude/portfolio/car-model.png')
car2 = img_to_b64('D:/素材/Claude/portfolio/car-chassis.png')
car3 = img_to_b64('D:/素材/Claude/portfolio/car-docking.png')

html_parts = []
html_parts.append('''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PPT视觉参考 — 无人接驳小车答辩</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Microsoft YaHei','SimHei',sans-serif;background:#e0e5ea;display:flex;flex-wrap:wrap;gap:24px;padding:30px;justify-content:center}
.card{width:400px;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.1);overflow:hidden}
.card-label{font-size:0.65rem;padding:6px 12px;background:#1a2a3a;color:#fff;letter-spacing:0.1em}
.c1{height:500px;display:flex;flex-direction:column;justify-content:center;align-items:center;background:linear-gradient(160deg,#0d1b2a 0%,#1b3a5c 50%,#1a5276 100%);padding:40px;text-align:center;position:relative}
.c2{height:500px;background:#fff;padding:40px 36px;display:flex;flex-direction:column}
.c3{height:500px;display:flex;flex-direction:column;justify-content:center;align-items:center;background:#fff;position:relative}
.c4{height:500px;background:#fff;padding:36px 28px}
.c5{height:500px;background:#fff;padding:30px 24px;display:flex;flex-direction:column}
</style>
</head>
<body>
''')

# 1. Cover
html_parts.append('''
<div class="card">
  <div class="card-label">01 · 封面页</div>
  <div class="c1">
    <div style="position:absolute;top:24px;left:24px;width:60px;height:4px;background:#3498db"></div>
    <div style="margin-bottom:36px;font-size:0.7rem;color:rgba(255,255,255,.5);letter-spacing:0.2em">齐鲁工业大学 · 机械工程学院</div>
    <div style="font-size:1.35rem;font-weight:700;color:#fff;line-height:1.6;margin-bottom:12px">露天矿区无人接驳小车<br>系统设计</div>
    <div style="width:40px;height:2px;background:#3498db;margin:14px auto"></div>
    <div style="font-size:0.65rem;color:rgba(255,255,255,.6);line-height:2">答辩人：张紫然 · 机器人22-1 · 指导教师：李老师</div>
    <div style="position:absolute;bottom:24px;font-size:0.55rem;color:rgba(255,255,255,.3)">2026年5月</div>
  </div>
</div>
''')

# 2. TOC
html_parts.append('''
<div class="card">
  <div class="card-label">02 · 目录页</div>
  <div class="c2">
    <div style="font-size:1.1rem;font-weight:700;color:#0d1b2a;margin-bottom:6px">汇报提纲</div>
    <div style="width:30px;height:3px;background:#3498db;margin-bottom:28px"></div>
    <div style="display:flex;flex-direction:column;gap:12px;font-size:0.75rem">
      <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:#f0f4f8;border-left:3px solid #3498db"><span style="color:#3498db;font-weight:700;font-size:1.1rem">01</span><span style="font-weight:600">研究背景与问题</span></div>
      <div style="display:flex;align-items:center;gap:12px;padding:10px 14px"><span style="color:#bbb;font-weight:700;font-size:1.1rem">02</span><span style="font-weight:600">系统总体方案</span></div>
      <div style="display:flex;align-items:center;gap:12px;padding:10px 14px"><span style="color:#bbb;font-weight:700;font-size:1.1rem">03</span><span style="font-weight:600">机械结构设计</span></div>
      <div style="display:flex;align-items:center;gap:12px;padding:10px 14px"><span style="color:#bbb;font-weight:700;font-size:1.1rem">04</span><span style="font-weight:600">电控与传感器系统</span></div>
      <div style="display:flex;align-items:center;gap:12px;padding:10px 14px"><span style="color:#bbb;font-weight:700;font-size:1.1rem">05</span><span style="font-weight:600">运动控制与导航</span></div>
      <div style="display:flex;align-items:center;gap:12px;padding:10px 14px"><span style="color:#bbb;font-weight:700;font-size:1.1rem">06</span><span style="font-weight:600">仿真验证与总结</span></div>
    </div>
  </div>
</div>
''')

# 3. Chapter divider with car
html_parts.append(f'''
<div class="card">
  <div class="card-label">03 · 章节过渡页（含小车图）</div>
  <div class="c3">
    <div style="position:absolute;left:0;top:0;bottom:0;width:5px;background:#3498db"></div>
    <div style="width:260px;height:210px;display:flex;align-items:center;justify-content:center">
      <img src="data:image/png;base64,{car1}" style="max-width:100%;max-height:100%;object-fit:contain">
    </div>
    <div style="margin-top:18px;font-size:1.3rem;font-weight:700;color:#0d1b2a">机械结构设计</div>
    <div style="width:40px;height:2px;background:#3498db;margin-top:10px"></div>
    <div style="font-size:0.65rem;color:#888;margin-top:6px">麦克纳姆轮底盘 · 自动接驳装置</div>
  </div>
</div>
''')

# 4. Research framework
html_parts.append('''
<div class="card">
  <div class="card-label">04 · 研究框架页</div>
  <div class="c4">
    <div style="font-size:0.95rem;font-weight:700;color:#0d1b2a;margin-bottom:18px">研究框架</div>
    <div style="display:flex;flex-direction:column;gap:9px;font-size:0.65rem">
      <div style="text-align:center;padding:8px;background:#0d1b2a;color:#fff;font-weight:600">露天矿区无人接驳小车系统设计</div>
      <div style="display:flex;gap:9px">
        <div style="flex:1;padding:10px 8px;background:#ebf0f5;text-align:center;font-weight:600;border-top:3px solid #3498db">机械系统</div>
        <div style="flex:1;padding:10px 8px;background:#ebf5f0;text-align:center;font-weight:600;border-top:3px solid #27ae60">控制系统</div>
        <div style="flex:1;padding:10px 8px;background:#fdf2f2;text-align:center;font-weight:600;border-top:3px solid #c0392b">导航系统</div>
      </div>
      <div style="display:flex;gap:9px">
        <div style="flex:1;padding:8px;background:#fafbfc;text-align:center;font-size:0.58rem;line-height:1.6">麦克纳姆轮底盘<br>自动接驳装置<br>SolidWorks三维建模</div>
        <div style="flex:1;padding:8px;background:#fafbfc;text-align:center;font-size:0.58rem;line-height:1.6">工控机+PLC<br>传感器选型布局<br>I/O时序逻辑</div>
        <div style="flex:1;padding:8px;background:#fafbfc;text-align:center;font-size:0.58rem;line-height:1.6">激光SLAM建图<br>A*路径规划<br>DWA局部避障</div>
      </div>
      <div style="text-align:center;padding:6px;background:#f7f9fc;border:1px dashed #d5d8dc;font-size:0.6rem">运动控制层：麦克纳姆轮运动学 + PID闭环调速</div>
      <div style="text-align:center;padding:6px;background:#f7f9fc;border:1px dashed #d5d8dc;font-size:0.6rem">仿真验证：MATLAB仿真 + 路径规划验证</div>
    </div>
    <div style="margin-top:14px;font-size:0.6rem;color:#888;text-align:center">
      创新点：缓冲纠偏一体化接驳装置 · 前馈+PID双层调速 · A*平滑+DWA分层导航
    </div>
  </div>
</div>
''')

# 5. Car images showcase
html_parts.append(f'''
<div class="card">
  <div class="card-label">05 · 机械设计展示（论文中的小车图）</div>
  <div class="c5">
    <div style="font-size:0.9rem;font-weight:700;color:#0d1b2a;margin-bottom:12px">麦克纳姆轮底盘与接驳装置</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;flex:1">
      <div style="background:#f7f9fc;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px;border-radius:2px">
        <img src="data:image/png;base64,{car2}" style="max-width:100%;max-height:100%;object-fit:contain">
        <div style="font-size:0.55rem;color:#888;margin-top:4px">底盘结构</div>
      </div>
      <div style="background:#f7f9fc;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px;border-radius:2px">
        <img src="data:image/png;base64,{car3}" style="max-width:100%;max-height:100%;object-fit:contain">
        <div style="font-size:0.55rem;color:#888;margin-top:4px">接驳装置</div>
      </div>
    </div>
    <div style="display:flex;gap:14px;margin-top:12px;font-size:0.62rem;color:#566573">
      <div style="flex:1;line-height:1.6"><strong style="color:#1a2a3a">亮点：</strong>缓冲吸能 + 侧向纠偏 + 自锁固定，一个装置解决三个问题</div>
      <div style="flex:1;line-height:1.6"><strong style="color:#1a2a3a">软件：</strong>SolidWorks 全车三维建模，明确装配关系</div>
    </div>
  </div>
</div>
''')

# 6. Simulation results
html_parts.append('''
<div class="card">
  <div class="card-label">06 · 仿真结果展示</div>
  <div style="height:500px;background:#fff;padding:30px 28px">
    <div style="font-size:0.9rem;font-weight:700;color:#0d1b2a;margin-bottom:12px">PID 转速控制仿真</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div style="background:#f7f9fc;height:130px;display:flex;align-items:center;justify-content:center;color:#888;font-size:0.58rem;border:1px solid #e5e8ec">[ 论文图5-5：阶跃响应 ]</div>
      <div style="background:#f7f9fc;height:130px;display:flex;align-items:center;justify-content:center;color:#888;font-size:0.58rem;border:1px solid #e5e8ec">[ 论文图5-6：跟踪响应 ]</div>
    </div>
    <div style="display:flex;gap:14px;margin-top:10px;font-size:0.62rem">
      <div style="flex:1;line-height:1.8;color:#555"><strong style="color:#0d1b2a">结论</strong><br>上升时间 < 0.1s<br>超调量 < 5%<br>稳态误差 < 2%</div>
      <div style="flex:1;line-height:1.6;color:#888">前馈补偿使响应时间比纯PID减少约40%</div>
    </div>
    <div style="margin-top:16px;font-size:0.8rem;font-weight:600;color:#0d1b2a">A* 路径规划对比</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px">
      <div style="background:#f7f9fc;height:110px;display:flex;align-items:center;justify-content:center;color:#888;font-size:0.55rem;border:1px solid #e5e8ec">[ 论文图6-5：传统A* ]</div>
      <div style="background:#f7f9fc;height:110px;display:flex;align-items:center;justify-content:center;color:#888;font-size:0.55rem;border:1px solid #e5e8ec">[ 论文图6-6：平滑A* ]</div>
    </div>
  </div>
</div>
''')

# 7. Summary
html_parts.append('''
<div class="card">
  <div class="card-label">07 · 总结页</div>
  <div style="height:500px;display:flex;flex-direction:column;justify-content:center;align-items:center;background:#fff;padding:40px">
    <div style="font-size:1.1rem;font-weight:700;color:#0d1b2a;margin-bottom:28px">研究总结</div>
    <div style="display:flex;flex-direction:column;gap:10px;width:100%;max-width:280px">
      <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#f0f8f0;font-size:0.68rem"><span style="font-size:0.9rem">&#10003;</span> 完成整车 SolidWorks 三维建模</div>
      <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#f0f8f0;font-size:0.68rem"><span style="font-size:0.9rem">&#10003;</span> 设计缓冲纠偏一体化接驳装置</div>
      <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#f0f8f0;font-size:0.68rem"><span style="font-size:0.9rem">&#10003;</span> 搭建 PLC + 工控机电控架构</div>
      <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#f0f8f0;font-size:0.68rem"><span style="font-size:0.9rem">&#10003;</span> PID 仿真超调量 < 5%</div>
      <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#f0f8f0;font-size:0.68rem"><span style="font-size:0.9rem">&#10003;</span> A* + DWA 路径规划仿真通过</div>
    </div>
    <div style="margin-top:28px;width:260px;display:flex;flex-direction:column;gap:5px;font-size:0.62rem;color:#888;text-align:center">
      <div style="display:flex;justify-content:space-between"><span>论文篇幅</span><span style="color:#0d1b2a;font-weight:600">52页 / 28篇参考文献</span></div>
      <div style="display:flex;justify-content:space-between"><span>创新点</span><span style="color:#0d1b2a;font-weight:600">接驳装置 / 前馈PID / 平滑A*</span></div>
      <div style="display:flex;justify-content:space-between"><span>工具</span><span style="color:#0d1b2a;font-weight:600">SolidWorks + MATLAB + PLC</span></div>
    </div>
  </div>
</div>
''')

html_parts.append('</body></html>')

with open('D:/素材/Claude/portfolio/defense-ppt-visual-ref.html', 'w', encoding='utf-8') as f:
    f.write(''.join(html_parts))
print(f'Written {os.path.getsize("D:/素材/Claude/portfolio/defense-ppt-visual-ref.html"):,} bytes')
