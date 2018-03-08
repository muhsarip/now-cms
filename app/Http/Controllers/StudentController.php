<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Student;

class StudentController extends Controller
{
	public function index()
	{
		return response()->json([
		    'success' => true,
		    'data'=> \App\Student::paginate(10),
		    'message' => 'Success create new student data'
		]); 
	}
	public function index2()
	{
		return response()->json([
		    'success' => true, 
		    'data'=> \App\Student::paginate(2),
		    'message' => 'Success create new student data'
		]); 
	}
    public function create(Request $request)
    {
    	$this->validate($request, [
	        'name' => 'required',
	        'class' => 'required',
	    ]);

	    $student = new Student;
	    $student->name = $request->name;
	    $student->class = $request->class;

	    if ($student->save()) {
		    return response()->json([
			    'success' => true,
			    'message' => 'Success create new student data'
			]);
	    }else{
	    	return response()->json([
			    'success' => false,
			    'message' => 'Fail to create new student data'
			]);
	    }
    }
    public function update(Request $request)
    {
    	$this->validate($request, [
	        'name' => 'required',
	        'class' => 'required',
	    ]);

	    $student = \App\Student::find($request->id);
	    $student->name = $request->name;
	    $student->class = $request->class;

	    if ($student->save()) {
		    return response()->json([
			    'success' => true,
			    'message' => 'Success update student data'
			]);
	    }else{
	    	return response()->json([
			    'success' => false,
			    'message' => 'Fail to update student data'
			]);
	    }
    }
    public function delete($id=null)
    {
    	if ($id!=null) {
    		$student = \App\Student::find($id);

			$student->delete();
			echo "done";
    	}
    }
    public function edit($id=null)
    {
    	if ($id!=null) {
    		$student = \App\Student::where("id",$id)->first();

			return response()->json([
			    'success' => true,
			    "data"=> $student,
			    'message' => 'success'
			]);
    	}
    }
}
