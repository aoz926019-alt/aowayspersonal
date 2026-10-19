import { useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../hooks/gsap";
import { routes, sampleShipments, selectRows, summarize, validShipment } from "../data/lab.js";
import labSource from "../data/lab.js?raw";
import "./CodeLab.css";

const filterSource = labSource.slice(labSource.indexOf("export function selectRows"), labSource.indexOf("export function summarize")).trim().replace(/^export /, "");

export default function CodeLab() {
  const ref = useRef(null);
  const [clean, setClean] = useState(true);
  const [route, setRoute] = useState("all");
  const [lateOnly, setLateOnly] = useState(false);
  const [view, setView] = useState("code");
  const rows = selectRows(sampleShipments, { clean, route, lateOnly });
  const result = summarize(rows);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".lab-heading, .lab-workbench", { y: 28, opacity: 0, duration: .8, stagger: .13,
        scrollTrigger: { trigger: ref.current, start: "top 75%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section code-lab" id="lab" ref={ref}>
      <div className="shell">
        <div className="section-rule"><span className="idx">03 — INTERACTIVE LAB / 代码实验</span><span className="lab-live"><i /> LIVE IN YOUR BROWSER</span></div>
        <div className="lab-heading"><h2>Code.<br /><em>Then see it work.</em></h2><div><p>把分析逻辑，变成可操作的结果。</p><span>切换清洗规则与运输目的地，观察指标和图表如何变化。<br />12 条假设运输记录，包含 1 条重复、1 条缺失值。</span></div></div>
        <div className="lab-workbench">
          <div className="lab-toolbar"><span><span aria-hidden="true">⌘</span> shipment_pipeline.js</span><a href="https://github.com/aoz926019-alt/aowayspersonal/blob/main/src/data/lab.js" target="_blank" rel="noreferrer">查看计算源码 ↗</a></div>
          <div className="lab-controls">
            <label className="lab-select">运输目的地<select aria-label="运输目的地" value={route} onChange={event => setRoute(event.target.value)}><option value="all">全部目的地</option>{Object.entries(routes).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
            <label className="lab-check"><input type="checkbox" checked={clean} onChange={event => setClean(event.target.checked)} /><span>去重并移除不完整记录</span></label>
            <label className="lab-check"><input type="checkbox" checked={lateOnly} onChange={event => setLateOnly(event.target.checked)} /><span>只看延误</span></label>
            <button className="lab-reset" type="button" onClick={() => { setClean(true); setRoute("all"); setLateOnly(false); }}>重置 ↺</button>
          </div>
          <div className="lab-panels">
            <div className="lab-source">
              <div className="lab-panel-label"><span>01 / INSPECT</span><div role="group" aria-label="查看代码或原始数据"><button type="button" aria-pressed={view === "code"} onClick={() => setView("code")}>计算逻辑</button><button type="button" aria-pressed={view === "data"} onClick={() => setView("data")}>原始数据</button></div></div>
              <pre tabIndex={0} aria-label={view === "code" ? "本演示实际使用的 JavaScript 筛选函数" : "完整的 12 条模拟运输记录"} data-lenis-prevent><code>{view === "code" ? `// JavaScript · 本演示实际运行的筛选函数\n// validShipment() 校验 ID、目的地、天数与成本\n\n${filterSource}` : JSON.stringify(sampleShipments, null, 2)}</code></pre>
              <div className="lab-pipeline"><span>12 原始记录</span><span aria-hidden="true">→</span><span>{clean ? "清洗开启" : "保留原始记录"}</span><span aria-hidden="true">→</span><strong>{result.count} 条输出</strong></div>
            </div>
            <div className="lab-output">
              <div className="lab-panel-label"><span>02 / OUTPUT</span><span className="lab-synthetic">假设数据 · 实时计算</span></div>
              <div className="lab-kpis" aria-live="polite" aria-atomic="true"><div><span>筛选后记录</span><strong>{result.count}<small> 条</small></strong></div><div><span>准时率</span><strong>{result.onTime === null ? "—" : (result.onTime * 100).toFixed(1)}<small>{result.onTime === null ? "" : "%"}</small></strong></div><div><span>平均运输时长</span><strong>{result.averageDays === null ? "—" : result.averageDays.toFixed(1)}<small> 天</small></strong></div></div>
              <div className="lab-chart" role="img" aria-label={result.byRoute.map(group => `${group.label}：${group.count} 条有效记录，${group.late} 条延误`).join("；")}><div className="lab-chart-title"><span>目的地 / 延误占比</span><span>延误 / 有效记录</span></div>{result.byRoute.map(group => <div className="lab-chart-row" key={group.id}><span>{group.label}</span><div><span style={{ width: `${group.count ? group.late / group.count * 100 : 0}%` }} /></div><span>{group.late} / {group.count}</span></div>)}</div>
              <details className="lab-records"><summary>核对筛选结果 <span>{result.count} ROWS +</span></summary><div className="lab-table-wrap" tabIndex={0} role="region" aria-label="筛选后运输记录" data-lenis-prevent><table><thead><tr><th>ID</th><th>目的地</th><th>实际 / 承诺天数</th><th>状态</th></tr></thead><tbody>{rows.map((row, index) => <tr key={`${row.id}-${index}`}><td>{row.id}</td><td>{routes[row.route]}</td><td>{row.actual ?? "—"} / {row.promised}</td><td>{!validShipment(row) ? "待补全" : row.actual > row.promised ? "延误" : "准时"}</td></tr>)}{rows.length === 0 && <tr><td colSpan={4}>当前筛选条件下没有记录</td></tr>}</tbody></table></div></details>
              <p className="lab-denominator">准时率与平均天数使用筛选后的完整记录，当前分母 {result.validCount} 条。关闭清洗时重复记录参与计算。</p>
            </div>
          </div>
          <div className="lab-foot"><span>React state → JavaScript transforms → live UI</span><span>浏览器内计算，无需上传数据</span></div>
        </div>
      </div>
    </section>
  );
}
