/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';

import db from '../database/initializeDB.js';

const router = express.Router();

/// //////////////////////////////////////
/// //////////// Advisors //////////////// 
/// //////////////////////////////////////
router.get('/advisors', async (req, res) => {
  try {
    const advisors = await db.sequelizeDB.query('SELECT * from advisors');
    res.json({ data: advisors });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.get('/advisors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const advisors = await db.sequelizeDB.query(
      `SELECT * from advisors where advisor_id = ${id}`
    );
    res.json({ data: advisors });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.delete('/advisors/:advisor_id', async (req, res) => {
  try {
    await db.advisors.destroy({
      where: {
        advisor_id: req.params.advisor_id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.put('/advisors', async (req, res) => {
  try {
    await db.advisors.update(
      {
        advisor_id: req.body.advisor_id,
        advisor_initials: req.body.advisor_initials
      },
      {
        where: {
          advisor_id: req.body.advisor_id
        }
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.post('/advisors', async (req, res) => {
  const advisor = await db.advisors.findAll();
  const currentId = (await advisor.length) + 1;
  try {
    const newAdvisor = await db.advisors.create({
      advisor_id: currentId,
      advisor_initials: req.body.advisor_initials
    });
    res.json(newAdvisor);
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

/// ////////////////////////////////////////
/// //////// Career Service Endpoints //////
/// ////////////////////////////////////////

router.get('/career_services', async (req, res) => {
  try {
    const careerServices = await db.sequelizeDB.query(
      'SELECT * from career_services'
    );
    res.json({ data: careerServices });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.get('/career_services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const careerServices = await db.sequelizeDB.query(
      `SELECT * from career_services where service_id = ${id}`
    );
    res.json({ data: careerServices });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.delete('/career_services/:service_id', async (req, res) => {
  try {
    await db.careerServices.destroy({
      where: {
        service_id: req.params.service_id,
      },
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/career_services', async (req, res) => {
  const careers = await db.careerServices.findAll();
  const currentId = (await careers.length) + 1;
  try {
    const newCareers = await db.careerServices.create({
      service_id: currentId,
      service_description: req.body.service_description,
    });
    res.json(newCareers);
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.put('/career_services', async (req, res) => {
  try {
    await db.careerServices.update(
      {
        service_id: req.body.service_id,
        service_description: req.body.service_description,
      },
      {
        where: {
          service_id: req.body.service_id,
        },
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});
/// /////////////////////////////////////////////
/// ///////Job Title Company Endpoint////////////
/// /////////////////////////////////////////////

router.get('/job_title_company', async (req, res) => {
  try {
    const jobTitleCompany = await db.sequelizeDB.query(
      'SELECT * from job_title_company'
    );
    res.json({ data: jobTitleCompany });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.get('/job_title_company/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const jobTitleCompany = await db.sequelizeDB.query(
      `SELECT * from job_title_company where job_title_id = ${id}`
    );
    res.json({ data: jobTitleCompany });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

/// ///////////////////////////////////////
/// /////// Students Endpoints/////////////
/// ///////////////////////////////////////

router.get('/students', async (req, res) => {
  try {
    const students = await db.sequelizeDB.query('SELECT * from students');
    res.json({ data: students });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.get('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const students = await db.sequelizeDB.query(
      `SELECT * from students where student_id = ${id}`
    );
    res.json({ data: students });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.post('/students', async (req, res) => {
  const student = await db.students.findAll();
  const currentId = (await student.length) + 1;
  try {
    const newStudent = await db.students.create({
      student_id: req.body.student_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      grad_semester: req.body.grad_semester,
      grad_year: req.body.grad_year,
      status: req.body.status,
      infosci_concentration: req.body.infosci_concentration
    });
    res.json(newStudent);
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.delete('/students/:student_id', async (req, res) => {
  try {
    await db.students.destroy({
      where: {
        student_id: req.params.student_id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.put('/students', async (req, res) => {
  try {
    await db.students.update(
      {
        student_id: req.body.student_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        grad_semester: req.body.grad_semester,
        grad_year: req.body.grad_year,
        status: req.body.status,
        infosci_concentration: req.body.infosci_concentration
      },
      {
        where: {
          student_id: req.body.student_id
        }
      }
    );
    res.send('Successfully updated')
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

/// //////////////////////////////////////////
/// //////////Job Title Info Endpoints////////
/// //////////////////////////////////////////
router.get('/job_title_info', async (req, res) => {
  try {
    const job = await db.sequelizeDB.query('SELECT * from job_title_info');
    res.json({ data: job });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.get('/job_title_info/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const job = await db.sequelizeDB.query(
      `SELECT * from job_title_info where job_title_id = ${id}`
    );
    res.json({ data: job });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

/// //////////////////////////////////////
/// ////////// Company Endpoints//////////
/// ////////////////////////////////////// 
router.get('/company', async (req, res) => {
  try {
    const company = await db.sequelizeDB.query('SELECT * from company')
    res.json({data: company});
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.get('/company/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const company = await db.sequelizeDB.query(`SELECT * from company where company_id = ${id}`)
    res.json({data: company});
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.post('/company', async (req, res) => {
  const company = await db.company.findAll();
  const currentId = (await company.length) + 1;
  console.log(req.body)
  try {
    const newCompnay = await db.company.create({
      company_id: currentId,
      company_name: req.body.company_name,
      size: req.body.size,
      type: req.body.type,
      city: req.body.city
    });
    res.json(newCompnay);
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.delete('/company/:company_name', async (req, res) => {
  try {
    await db.company.destroy({
      where: {
        company_name: req.params.company_name
      },
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/company', async (req, res) => {
  try {
    await db.company.update(
      {
        company_name: req.body.company_name,
        size: req.body.size,
        type: req.body.type,
        city: req.body.city
      },
      {
        where: {
          company_id: req.body.company_id
        },
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});
/// /////////////////////////////////
/// ////Dining Hall Endpoints////////
/// /////////////////////////////////
router.get('/dining', async (req, res) => {
  try {
    const halls = await db.DiningHall.findAll();
    const reply = halls.length > 0 ? { data: halls } : { message: 'no results found' };
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/dining/:hall_id', async (req, res) => {
  try {
    const hall = await db.DiningHall.findAll({
      where: {
        hall_id: req.params.hall_id,
      },
    });

    res.json(hall);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/dining', async (req, res) => {
  const halls = await db.DiningHall.findAll();
  const currentId = (await halls.length) + 1;
  try {
    const newDining = await db.DiningHall.create({
      hall_id: currentId,
      hall_name: req.body.hall_name,
      hall_address: req.body.hall_address,
      hall_lat: req.body.hall_lat,
      hall_long: req.body.hall_long,
    });
    res.json(newDining);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.delete('/dining/:hall_id', async (req, res) => {
  try {
    await db.DiningHall.destroy({
      where: {
        hall_id: req.params.hall_id,
      },
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/dining', async (req, res) => {
  try {
    await db.DiningHall.update(
      {
        hall_name: req.body.hall_name,
        hall_location: req.body.hall_location,
      },
      {
        where: {
          hall_id: req.body.hall_id,
        },
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// ////////Meals Endpoints//////////
/// /////////////////////////////////
router.get('/meals', async (req, res) => {
  try {
    const meals = await db.Meals.findAll();
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/meals/:meal_id', async (req, res) => {
  try {
    const meals = await db.Meals.findAll({
      where: {
        meal_id: req.params.meal_id,
      },
    });
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/meals', async (req, res) => {
  try {
    await db.Meals.update(
      {
        meal_name: req.body.meal_name,
        meal_category: req.body.meal_category,
      },
      {
        where: {
          meal_id: req.body.meal_id,
        },
      }
    );
    res.send('Meal Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// ////////Macros Endpoints/////////
/// /////////////////////////////////
router.get('/macros', async (req, res) => {
  try {
    const macros = await db.Macros.findAll();
    res.send(macros);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/macros/:meal_id', async (req, res) => {
  try {
    const meals = await db.Macros.findAll({
      where: {
        meal_id: req.params.meal_id,
      },
    });
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/macros', async (req, res) => {
  try {
    // N.B. - this is a good example of where to use code validation to confirm objects
    await db.Macros.update(
      {
        meal_name: req.body.meal_name,
        meal_category: req.body.meal_category,
        calories: req.body.calories,
        serving_size: req.body.serving_size,
        cholesterol: req.body.cholesterol,
        sodium: req.body.sodium,
        carbs: req.body.carbs,
        protein: req.body.protein,
        fat: req.body.fat,
      },
      {
        where: {
          meal_id: req.body.meal_id,
        },
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// Dietary Restrictions Endpoints///
/// /////////////////////////////////
router.get('/restrictions', async (req, res) => {
  try {
    const restrictions = await db.DietaryRestrictions.findAll();
    res.json(restrictions);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/restrictions/:restriction_id', async (req, res) => {
  try {
    const restrictions = await db.DietaryRestrictions.findAll({
      where: {
        restriction_id: req.params.restriction_id,
      },
    });
    res.json(restrictions);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// //////////////////////////////////
/// ///////Custom SQL Endpoint////////
/// /////////////////////////////////
const macrosCustom = 'SELECT `Dining_Hall_Tracker`.`Meals`.`meal_id` AS `meal_id`,`Dining_Hall_Tracker`.`Meals`.`meal_name` AS `meal_name`,`Dining_Hall_Tracker`.`Macros`.`calories` AS `calories`,`Dining_Hall_Tracker`.`Macros`.`carbs` AS `carbs`,`Dining_Hall_Tracker`.`Macros`.`sodium` AS `sodium`,`Dining_Hall_Tracker`.`Macros`.`protein` AS `protein`,`Dining_Hall_Tracker`.`Macros`.`fat` AS `fat`,`Dining_Hall_Tracker`.`Macros`.`cholesterol` AS `cholesterol`FROM(`Dining_Hall_Tracker`.`Meals`JOIN `Dining_Hall_Tracker`.`Macros`)WHERE(`Dining_Hall_Tracker`.`Meals`.`meal_id` = `Dining_Hall_Tracker`.`Macros`.`meal_id`)';
router.get('/table/data', async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(macrosCustom, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

const mealMapCustom = `SELECT hall_name,
  hall_address,
  hall_lat,
  hall_long,
  meal_name
FROM
  Meals m
INNER JOIN Meals_Locations ml 
  ON m.meal_id = ml.meal_id
INNER JOIN Dining_Hall d
ON d.hall_id = ml.hall_id;`;
router.get('/map/data', async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(mealMapCustom, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});
router.get('/custom', async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(req.body.query, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

export default router;
