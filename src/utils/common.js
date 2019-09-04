// 院系以及专业选择树的数据过滤
export function filterDataIds(ids) {
  const newIds = []
  const pidLength1 = [] // 院系
  const pidLength2 = [] // 专业
  const pidLength3 = [] // 学年
  for (let i = 0; i < ids.length; i++) {
    const item = ids[i]
    if (item.hasOwnProperty('children')) { // 判断每一条数据是否含有children属性
      const pid = item['id']
      const pidLength = pid.split('_').length // 通过判断id的长短，来区分院系和专业，并分别添加到对应的列表中
      if (pidLength === 1) {
        pidLength1.push(item)
      } else {
        pidLength2.push(item)
      }
    } else {
      pidLength3.push(item) // 没有children属性，直接添加到学年列表中
    }
  }
  // 从1里 删 2 和3  删2 用儿子比对删  删3 就得用 id比对删
  for (let i = 0; i < pidLength1.length; i++) {
    const item = pidLength1[i]
    // 删2 院系的子项中与专业重合的，从专业数组中的此项删除
    for (let j = pidLength2.length - 1; j >= 0; j--) {
      if (item['children'].indexOf(pidLength2[j]) > -1) {
        pidLength2.splice(j, 1)
      }
    }
    // 删3 若学年的id中存在院系的id，将该学年从学年数组中删除
    for (let k = pidLength3.length - 1; k >= 0; k--) {
      if (pidLength3[k].id.indexOf(item.id) > -1) {
        pidLength3.splice(k, 1)
      }
    }
  }
  // 从2 里删 3 当只有专业和学年选中时，若专业的子项和学年有重合，将该学年从学年数组中删除
  for (let i = 0; i < pidLength2.length; i++) {
    const item = pidLength2[i]
    for (let j = pidLength3.length - 1; j >= 0; j--) {
      if (item['children'].indexOf(pidLength3[j]) > -1) {
        pidLength3.splice(j, 1)
      }
    }
  }
  //  // 123 合并
  return newIds.concat(pidLength1, pidLength2, pidLength3)
}
