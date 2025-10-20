const courses = [
  { id: 1, title: "JavaScript cơ bản", type: "Lập trình" },
  { id: 2, title: "React nâng cao", type: "Lập trình" },
  { id: 3, title: "Photoshop từ đầu", type: "Thiết kế" },
  { id: 4, title: "UI/UX cơ bản", type: "Thiết kế" },
  { id: 5, title: "Quản trị dự án", type: "Kỹ năng mềm" },
  { id: 6, title: "Node.js API", type: "Lập trình" },
];
function groupByTypeToObject(list) {
  return list.reduce((acc, course) => {

    const key = course.type ?? 'Unknown'; 
    console.log(key)
    if (!acc[key])
         acc[key] = [];
    acc[key].push(course);
    return acc;
  }, {});
}

// Sử dụng
const groupedObject = groupByTypeToObject(courses);
console.log(groupedObject);

/* Kết quả console:
{
  "Lập trình": [
    { id: 1, title: "JavaScript cơ bản", type: "Lập trình" },
    { id: 2, title: "React nâng cao", type: "Lập trình" },
    { id: 6, title: "Node.js API", type: "Lập trình" }
  ],
  "Thiết kế": [...],
  "Kỹ năng mềm": [...]
}
*/
