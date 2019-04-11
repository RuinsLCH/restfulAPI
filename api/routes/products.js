const express = require('express');
const router = express.Router();

router.get('/',(req, res, next)=>{
	res.status(200).json({
		message: 'Handling GET requests to /product'
	});
});

router.post('/',(req, res, next)=>{
	res.status(201).json({
		message: 'Handling POST requests to /product'
	});
});

router.get('/:productId',(req, res, next)=>{
	const id = req.params.productId;
	if(id==='special'){
		res.status(200).json({
			message:'You discovered the special ID',
			id:id
		});
	} else {
		res.status(200).json({
			message:'You pass an ID',
			id:id
		});
	}
});

router.patch('/:productId',(req, res, next)=>{
	res.status(200).json({
		message:'Updated product!'
	});
});

router.delete('/:productId',(req, res, next)=>{
	res.status(200).json({
		message:'Deleted product!'
	});
});


module.exports = router;