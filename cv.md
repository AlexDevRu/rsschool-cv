# Alexander Kulakov
- <kulakov-alex01@mail.com>
- +375 (33) 374-62-82
- Minsk, Belarus
---
## About me
I have special secondary education. Now I am studying in BSUIR.  
I am responsible, executive, diligent, stress-resistant. I easily learn new things.  
There is no work experience, but there is a great desire to study and develop in the IT field.
## Skills
-	C#, .NET, WPF, WinForms
-	Python 3, Django
-	HTML, CSS, JavaScript, jQuery
-	React.js
-	REST API
-	SQL
-	Object Oriented Programming
-	SOLID
-	Git
## Coding
	function deepEqual(obj1, obj2) {
		let prop1 = Object.keys(obj1);
		let prop2 = Object.keys(obj2);
		for(let i = 0; i<prop1.length || i<prop2.length; i++) {
			let p1 = prop1[i];
			let p2 = prop2[i];

			let is_obj1 = typeof(obj1[p1]) === "object";
			let is_obj2 = typeof(obj2[p2]) === "object";
			
			let value1 = obj1[p1];
			let value2 = obj2[p2];

			console.log(`${p1}, ${value1}, is object - ${is_obj1}`);
			console.log(`${p2}, ${value2}, is object - ${is_obj2}`);
			
			if(value1 !== value2 && !is_obj1 && !is_obj2 || 
				(value1 === null && is_obj2 || value2 === null && is_obj1))
				return false;

			if(value1 !== null && value2 !== null && is_obj1 && is_obj2)
				if(!deepEqual(obj1[p1], obj2[p2]))
					return false;	
		}
		return true;
	}