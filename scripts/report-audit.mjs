import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

export function summarizeAudit(report) {
  if (!report || report.error || report.auditReportVersion !== 2) {
    throw new Error('Audit did not return a supported vulnerability report.')
  }
  const totals = report.metadata?.vulnerabilities
  const severities = ['info', 'low', 'moderate', 'high', 'critical']
  if (!totals || [...severities, 'total'].some(key => !Number.isSafeInteger(totals[key]) || totals[key] < 0)
    || severities.reduce((sum, key) => sum + totals[key], 0) !== totals.total
    || !report.vulnerabilities || typeof report.vulnerabilities !== 'object' || Array.isArray(report.vulnerabilities)) {
    throw new Error('Audit report is incomplete or inconsistent; security status is unknown.')
  }
  return {
    totals,
    blocked: totals.moderate + totals.high + totals.critical > 0,
    packages: Object.entries(report.vulnerabilities).map(([name, item]) => ({
      package: name,
      severity: item.severity,
      direct: item.isDirect,
      range: item.range,
      fixAvailable: item.fixAvailable,
      advisories: (item.via ?? [])
        .filter(entry => entry && typeof entry === 'object')
        .map(({ title, url, range, severity }) => ({ title, url, range, severity })),
    })),
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const result = summarizeAudit(JSON.parse(readFileSync(process.argv[2] ?? 'npm-audit.json', 'utf8')))
    console.log('Vulnerability totals:', JSON.stringify(result.totals))
    for (const item of result.packages) console.log(JSON.stringify(item))
    if (result.blocked) {
      console.error('Dependency audit failed: moderate or higher vulnerabilities found.')
      process.exitCode = 1
    }
  } catch (error) {
    console.error(`Dependency audit failed: ${error.message}`)
    process.exitCode = 1
  }
}
