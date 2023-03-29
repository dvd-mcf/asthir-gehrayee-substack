outlets = 1

var speedmax = 2.5
var speedmin = 0.1

function list(arguments) 
{
	var i,v,len;
	var numbersList = [];
	var sum = 0.;
	var mean = 0.;
	var distanceSum=0.;
	var distanceSumDivided = 0.;
	var distanceDividedRoot= 0.;
	
	len = arguments.length;
	
	//array

	
		for (i = 0; i < len; i++) {
		
			
			v = arguments[i]
			if (v > speedmax) {
				numbersList.push(false);
			} else if (v < speedmin){
				numbersList.push(false);
			} else {
				numbersList.push(true)
			}
		};
		//stdcalc
		
		for (i=0;i<len;i++)
		{
			sum += arguments[i]
		}
		
				mean = sum/len;

		
		for (i = 0; i < len; i++)
		{
			distanceSum += ((v - mean)*(v-mean))
		}
		

		distanceSumDivided = distanceSum/len;
		distanceDividedRoot = Math.sqrt(distanceSumDivided);
		
	outlet(0, numbersList);
	//outlet(1, distanceDividedRoot);
	//outlet(2, mean)

};
		
		
		