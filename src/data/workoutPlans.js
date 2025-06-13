const workoutPlans = {
  beginner: {
    'weight-loss': {
      ectomorph: {
        name: 'Beginner Weight Loss - Ectomorph',
        description:
          'Focus on cardio with light resistance training to boost metabolism while preserving lean muscle.',
        frequency: '3-4 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Cardio + Upper Body',
            exercises: [
              { name: 'Dumbbell Burpee', duration: '20 minutes', sets: null, reps: null },
              { name: 'Barbell Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Incline Shoulder Raise', sets: 3, reps: '10' },
              { name: 'Barbell Curl', sets: 3, reps: '10' },
              { name: 'Barbell Rear Delt Raise', sets: 2, reps: '12' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Rest or Light Activity',
            exercises: [
              { name: 'Walking on Stepmill', duration: '20-30 minutes', sets: null, reps: null },
              { name: 'Side Push Neck Stretch', duration: '10 minutes', sets: null, reps: null },
            ],
          },
          {
            day: 'Day 3',
            name: 'Cardio + Lower Body & Core',
            exercises: [
              { name: 'Stationary Bike Run v. 3', duration: '20 minutes', sets: null, reps: null },
              { name: 'Barbell Front Chest Squat', sets: 3, reps: '12' },
              { name: 'Donkey Calf Raise', sets: 3, reps: '15' },
              { name: '45° Side Bend', sets: 3, reps: '15 each side' },
              { name: 'Barbell Press Sit-up', sets: 2, reps: '15' },
            ],
          },
        ],
        tips: [
          'Ectomorphs should eat enough calories to prevent excessive fat loss.',
          'Stay consistent with cardio to improve stamina.',
          'Stretch after each workout to prevent tightness.',
        ],
      },

      mesomorph: {
        name: 'Beginner Weight Loss - Mesomorph',
        description:
          'Balanced plan combining cardio and strength, ideal for naturally athletic body types to reduce fat and retain muscle.',
        frequency: '4 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Upper Body Burn',
            exercises: [
              { name: 'Run (Equipment)', duration: '15 minutes', sets: null, reps: null },
              { name: 'Barbell Guillotine Bench Press', sets: 3, reps: '10-12' },
              { name: 'Barbell Rear Delt Row', sets: 3, reps: '12' },
              { name: 'Barbell Drag Curl', sets: 3, reps: '10' },
              { name: 'Barbell Standing Front Raise Over Head', sets: 2, reps: '10' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Core & Recovery',
            exercises: [
              {
                name: 'Walk Elliptical Cross Trainer',
                duration: '25 minutes',
                sets: null,
                reps: null,
              },
              { name: 'Alternate Heel Touchers', sets: 3, reps: '15 each side' },
              { name: 'Air Bike', sets: 2, reps: '20' },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2, reps: null },
            ],
          },
          {
            day: 'Day 3',
            name: 'Lower Body Shred',
            exercises: [
              { name: 'Stationary Bike Walk', duration: '20 minutes', sets: null, reps: null },
              { name: 'Barbell Clean-Grip Front Squat', sets: 3, reps: '10' },
              { name: 'Barbell Seated Calf Raise', sets: 3, reps: '15' },
              { name: 'Barbell Standing Rocking Leg Calf Raise', sets: 3, reps: '15' },
              { name: 'Assisted Motion Russian Twist', sets: 3, reps: '20' },
            ],
          },
        ],
        tips: [
          'Mesomorphs respond well to moderate to intense training.',
          'Keep protein intake high to maintain lean mass.',
          'Track progress weekly and adjust effort as needed.',
        ],
      },

      endomorph: {
        name: 'Beginner Weight Loss - Endomorph',
        description:
          'Aggressive cardio and high-rep resistance work to maximize calorie burn and accelerate fat loss for slower metabolisms.',
        frequency: '4-5 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Fat Burner HIIT + Chest',
            exercises: [
              { name: 'Burpee', duration: '20 minutes HIIT style', sets: null, reps: null },
              { name: 'Barbell Decline Wide-Grip Press', sets: 3, reps: '12' },
              { name: 'Barbell Front Raise and Pullover', sets: 3, reps: '12' },
              { name: 'Cable Bench Press', sets: 3, reps: '10-12' },
              { name: 'Assisted Chest Dip (Kneeling)', sets: 2, reps: '12' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Back + Arms Circuit',
            exercises: [
              { name: 'Alternate Lateral Pulldown', sets: 3, reps: '12-15' },
              { name: 'Assisted Pull-up', sets: 3, reps: '10' },
              { name: 'Barbell Bent Over Row', sets: 3, reps: '12' },
              { name: 'Barbell Close-Grip Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell JM Bench Press', sets: 2, reps: '12' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Legs & Core Fat Flush',
            exercises: [
              { name: 'Run', duration: '25 minutes', sets: null, reps: null },
              { name: 'Barbell Deadlift', sets: 3, reps: '10' },
              { name: 'Barbell Standing Leg Calf Raise', sets: 3, reps: '15-20' },
              { name: '3/4 Sit-up', sets: 3, reps: '15' },
              { name: 'Assisted Hanging Knee Raise With Throw Down', sets: 2, reps: '15' },
            ],
          },
        ],
        tips: [
          'Focus on consistent cardio and active rest days.',
          'Reduce refined carbs and increase fiber intake.',
          'Stay disciplined and patient — steady fat loss wins.',
        ],
      },
    },
    'muscle-gain': {
      ectomorph: {
        name: 'Beginner Muscle Gain - Ectomorph',
        description:
          'Low-volume compound lifts with increased rest and calorie surplus to build foundational lean muscle mass.',
        frequency: '3 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Push Strength',
            exercises: [
              { name: 'Barbell Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Incline Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Close-Grip Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Standing Front Raise Over Head', sets: 2, reps: '12' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Pull Strength + Arms',
            exercises: [
              { name: 'Assisted Pull-up', sets: 3, reps: '10' },
              { name: 'Barbell Incline Row', sets: 3, reps: '12' },
              { name: 'Barbell Curl', sets: 3, reps: '10' },
              { name: 'Barbell Drag Curl', sets: 2, reps: '12' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Legs + Core',
            exercises: [
              { name: 'Barbell Front Squat', sets: 3, reps: '10' },
              { name: 'Barbell Standing Leg Calf Raise', sets: 3, reps: '15' },
              { name: 'Barbell Press Sit-up', sets: 3, reps: '15' },
              { name: 'Assisted Motion Russian Twist', sets: 2, reps: '20' },
            ],
          },
        ],
        tips: [
          'Ectomorphs should consume a calorie surplus with high protein.',
          'Stick to form-focused compound movements.',
          'Avoid excessive cardio during mass gain phase.',
        ],
      },

      mesomorph: {
        name: 'Beginner Muscle Gain - Mesomorph',
        description:
          'Balanced volume with progressive overload and compound-to-isolation transitions for full hypertrophy.',
        frequency: '4 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Chest + Triceps',
            exercises: [
              { name: 'Barbell Guillotine Bench Press', sets: 3, reps: '10' },
              { name: 'Cable Bench Press', sets: 3, reps: '10-12' },
              { name: 'Barbell JM Bench Press', sets: 3, reps: '10' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Back + Biceps',
            exercises: [
              { name: 'Barbell Pullover', sets: 3, reps: '12' },
              { name: 'Barbell Rear Delt Row', sets: 3, reps: '12' },
              { name: 'Barbell Alternate Biceps Curl', sets: 3, reps: '10' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Legs',
            exercises: [
              { name: 'Barbell Full Squat', sets: 3, reps: '10' },
              { name: 'Barbell Standing Leg Calf Raise', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Core + Shoulders',
            exercises: [
              { name: 'Barbell Standing Bradford Press', sets: 3, reps: '12' },
              { name: 'Barbell Rear Delt Raise', sets: 3, reps: '10' },
              { name: '3/4 Sit-up', sets: 3, reps: '20' },
            ],
          },
        ],
        tips: [
          'Mesomorphs can gain easily, so focus on clean bulking.',
          'Track weights to ensure progressive overload.',
          'Recover properly and avoid overtraining.',
        ],
      },

      endomorph: {
        name: 'Beginner Muscle Gain - Endomorph',
        description:
          'Controlled resistance training with moderate reps and limited cardio to build muscle without adding excess fat.',
        frequency: '4 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Chest + Arms',
            exercises: [
              { name: 'Barbell Decline Wide-Grip Press', sets: 3, reps: '10' },
              { name: 'Barbell Close-Grip Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Curl', sets: 3, reps: '12' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Back + Core',
            exercises: [
              { name: 'Barbell Bent Over Row', sets: 3, reps: '12' },
              { name: 'Assisted Pull-up', sets: 3, reps: '10' },
              { name: 'Barbell Press Sit-up', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Legs',
            exercises: [
              { name: 'Barbell Front Chest Squat', sets: 3, reps: '10' },
              { name: 'Barbell Standing Leg Calf Raise', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Mobility & Light Cardio',
            exercises: [
              {
                name: 'Walk Elliptical Cross Trainer',
                duration: '15-20 minutes',
                sets: null,
                reps: null,
              },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
        ],
        tips: [
          'Focus on lean protein and moderate carbs during gain phase.',
          'Include a light cardio day to regulate fat gain.',
          'Stay consistent with rest and sleep.',
        ],
      },
    },
    maintenance: {
      ectomorph: {
        name: 'Beginner Maintenance - Ectomorph',
        description:
          'Low-intensity full-body workouts to sustain lean muscle while preventing fatigue or overtraining.',
        frequency: '3 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Upper Body + Core',
            exercises: [
              { name: 'Barbell Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Incline Shoulder Raise', sets: 3, reps: '10' },
              { name: 'Barbell Curl', sets: 3, reps: '10' },
              { name: 'Barbell Press Sit-up', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Active Recovery',
            exercises: [
              { name: 'Walking on Stepmill', duration: '20 minutes', sets: null, reps: null },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
          {
            day: 'Day 3',
            name: 'Lower Body + Core',
            exercises: [
              { name: 'Barbell Front Chest Squat', sets: 3, reps: '12' },
              { name: 'Donkey Calf Raise', sets: 3, reps: '15' },
              { name: 'Assisted Motion Russian Twist', sets: 3, reps: '20' },
            ],
          },
        ],
        tips: [
          'Eat at maintenance calories and stay consistent with protein intake.',
          'Focus on proper form over intensity.',
          'Incorporate stretching after each workout.',
        ],
      },

      mesomorph: {
        name: 'Beginner Maintenance - Mesomorph',
        description:
          'Balanced maintenance program for strength, endurance, and flexibility. Ideal for keeping muscle while avoiding fat gain.',
        frequency: '3-4 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Full Body Strength',
            exercises: [
              { name: 'Barbell Incline Row', sets: 3, reps: '12' },
              { name: 'Barbell Guillotine Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Standing Bradford Press', sets: 3, reps: '10' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Core + Cardio',
            exercises: [
              {
                name: 'Walk Elliptical Cross Trainer',
                duration: '20 minutes',
                sets: null,
                reps: null,
              },
              { name: '3/4 Sit-up', sets: 3, reps: '20' },
              { name: 'Air Bike', sets: 2, reps: '25' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Lower Body & Mobility',
            exercises: [
              { name: 'Barbell Front Squat', sets: 3, reps: '12' },
              { name: 'Dumbbell Seated One Leg Calf Raise', sets: 3, reps: '15' },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
          {
            day: 'Day 4',
            name: 'Optional Light Recovery',
            exercises: [
              { name: 'Walking on Stepmill', duration: '15-20 minutes', sets: null, reps: null },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
        ],
        tips: [
          'Keep workouts balanced between strength and movement.',
          'Maintain hydration and avoid long gaps in training.',
          'Sustain meal consistency with moderate carbs and lean protein.',
        ],
      },

      endomorph: {
        name: 'Beginner Maintenance - Endomorph',
        description:
          'Fat control and muscle retention plan with structured resistance and consistent low-intensity cardio.',
        frequency: '4 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Upper Body Strength',
            exercises: [
              { name: 'Barbell Decline Wide-Grip Press', sets: 3, reps: '10' },
              { name: 'Barbell Rear Delt Row', sets: 3, reps: '12' },
              { name: 'Cable Bench Press', sets: 3, reps: '10' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Cardio + Core',
            exercises: [
              { name: 'Run (Equipment)', duration: '20 minutes', sets: null, reps: null },
              { name: 'Barbell Press Sit-up', sets: 3, reps: '15' },
              { name: 'Assisted Hanging Knee Raise', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Legs + Mobility',
            exercises: [
              { name: 'Barbell Clean-Grip Front Squat', sets: 3, reps: '10' },
              { name: 'Barbell Standing Leg Calf Raise', sets: 3, reps: '15' },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
          {
            day: 'Day 4',
            name: 'Light Active Recovery',
            exercises: [
              {
                name: 'Walk Elliptical Cross Trainer',
                duration: '20 minutes',
                sets: null,
                reps: null,
              },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
        ],
        tips: [
          'Do low-intensity cardio at least twice a week.',
          'Keep sugar and refined carbs low to sustain fat control.',
          'Focus on consistent light movement on off days.',
        ],
      },
    },
  },

  intermediate: {
    'weight-loss': {
      ectomorph: {
        name: 'Intermediate Weight Loss - Ectomorph',
        description:
          'Lean-focused training with moderate cardio and structured resistance to maintain muscle mass and boost metabolism.',
        frequency: '5 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Back + Cardio',
            exercises: [
              { name: 'Barbell Incline Row', sets: 3, reps: '12' },
              { name: 'Assisted Pull-up', sets: 3, reps: '10' },
              { name: 'Barbell Pullover', sets: 3, reps: '12' },
              { name: 'Stationary Bike Run v. 3', duration: '20 minutes', sets: null, reps: null },
              { name: 'Burpee', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Chest + Lower Arms',
            exercises: [
              { name: 'Barbell Incline Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Guillotine Bench Press', sets: 3, reps: '10-12' },
              { name: 'Cable Bench Press', sets: 3, reps: '12' },
              { name: 'Barbell Reverse Wrist Curl', sets: 3, reps: '15' },
              { name: 'Dumbbell Lying Supination', sets: 2, reps: '15' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Lower Body + Cardio',
            exercises: [
              { name: 'Barbell Clean-Grip Front Squat', sets: 3, reps: '10' },
              { name: 'Dumbbell Standing Calf Raise', sets: 3, reps: '15' },
              { name: 'Barbell Seated Calf Raise', sets: 3, reps: '15' },
              { name: 'Run (Equipment)', duration: '20 minutes', sets: null, reps: null },
              { name: 'Air Bike', sets: 3, reps: '20' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Shoulders + Upper Arms',
            exercises: [
              { name: 'Barbell Rear Delt Row', sets: 3, reps: '12' },
              { name: 'Barbell Seated Bradford Rocky Press', sets: 3, reps: '10' },
              { name: 'Barbell Alternate Biceps Curl', sets: 3, reps: '12' },
              { name: 'Barbell Close-Grip Bench Press', sets: 3, reps: '10' },
              { name: 'Assisted Triceps Dip (Kneeling)', sets: 2, reps: '12' },
            ],
          },
          {
            day: 'Day 5',
            name: 'Waist + Neck + Light Cardio',
            exercises: [
              { name: 'Assisted Motion Russian Twist', sets: 3, reps: '20' },
              { name: 'Barbell Press Sit-up', sets: 3, reps: '15' },
              { name: 'Assisted Hanging Knee Raise', sets: 2, reps: '12' },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
              { name: 'Walking on Stepmill', duration: '15-20 minutes', sets: null, reps: null },
            ],
          },
        ],
        tips: [
          'Use progressive overload to gradually build strength.',
          'Stay hydrated and follow high-protein meals.',
          'Don’t skip cardio days — they help with lean conditioning.',
        ],
      },

      mesomorph: {
        name: 'Intermediate Weight Loss - Mesomorph',
        description:
          'Structured mix of cardio and resistance targeting fat burn while maintaining muscle. Perfect for athletic body types.',
        frequency: '5 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Full Upper Body',
            exercises: [
              { name: 'Barbell Wide Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Rear Delt Raise', sets: 3, reps: '12' },
              { name: 'Barbell Incline Shoulder Raise', sets: 3, reps: '10' },
              { name: 'Barbell JM Bench Press', sets: 2, reps: '12' },
              { name: 'Burpee', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Leg Strength + Core',
            exercises: [
              { name: 'Barbell Front Squat', sets: 3, reps: '10' },
              { name: 'Lever Standing Calf Raise', sets: 3, reps: '15' },
              { name: 'Barbell Clean and Press', sets: 3, reps: '8' },
              { name: 'Alternate Heel Touchers', sets: 3, reps: '20' },
              { name: '3/4 Sit-up', sets: 2, reps: '20' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Back + Arms',
            exercises: [
              { name: 'Barbell Bent Over Row', sets: 3, reps: '10-12' },
              { name: 'Barbell Decline Wide-Grip Pullover', sets: 3, reps: '12' },
              { name: 'Barbell Curl', sets: 3, reps: '12' },
              { name: 'Cable Reverse Wrist Curl', sets: 3, reps: '15' },
              { name: 'Dumbbell Lying Pronation', sets: 2, reps: '15' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Cardio Intensive',
            exercises: [
              { name: 'Run', duration: '25 minutes', sets: null, reps: null },
              { name: 'Dumbbell Burpee', sets: 3, reps: '15' },
              {
                name: 'Walk Elliptical Cross Trainer',
                duration: '15 minutes',
                sets: null,
                reps: null,
              },
              { name: 'Side Push Neck Stretch', duration: '10 minutes', sets: null, reps: null },
              { name: 'Air Bike', sets: 2, reps: '25' },
            ],
          },
          {
            day: 'Day 5',
            name: 'Chest + Core + Stretch',
            exercises: [
              { name: 'Barbell Decline Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Front Raise and Pullover', sets: 3, reps: '10' },
              { name: 'Assisted Lying Leg Raise With Throw Down', sets: 2, reps: '15' },
              { name: 'Barbell Press Sit-up', sets: 2, reps: '15' },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
        ],
        tips: [
          'Mesomorphs benefit from 50/50 strength and cardio routines.',
          'Avoid overtraining — keep rest days active but light.',
          'Track body composition monthly, not just weight.',
        ],
      },

      endomorph: {
        name: 'Intermediate Weight Loss - Endomorph',
        description:
          'High-intensity, volume-rich workouts for fast fat burn and metabolic boost. Perfect for endomorphs looking to lean out.',
        frequency: '5 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Cardio + Upper Body Circuit',
            exercises: [
              { name: 'Run (Equipment)', duration: '20 minutes', sets: null, reps: null },
              { name: 'Barbell Bench Press', sets: 3, reps: '12' },
              { name: 'Barbell Rear Delt Row', sets: 3, reps: '12' },
              { name: 'Barbell Curl', sets: 3, reps: '12' },
              { name: 'Burpee', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Legs + Glutes + Cardio',
            exercises: [
              { name: 'Barbell Full Squat', sets: 3, reps: '10' },
              { name: 'Dumbbell Seated One Leg Calf Raise', sets: 3, reps: '15' },
              { name: 'Barbell Standing Rocking Leg Calf Raise', sets: 3, reps: '15' },
              { name: 'Stationary Bike Walk', duration: '20 minutes', sets: null, reps: null },
              { name: '45° Side Bend', sets: 2, reps: '15 each side' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Back + Arms HIIT',
            exercises: [
              { name: 'Barbell Decline Bent Arm Pullover', sets: 3, reps: '12' },
              { name: 'Barbell One Arm Bent Over Row', sets: 3, reps: '10' },
              { name: 'Barbell Lying Close-Grip Press', sets: 3, reps: '12' },
              { name: 'Cable Wrist Curl', sets: 2, reps: '15' },
              { name: 'Burpee', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Shoulders + Neck + Mobility',
            exercises: [
              { name: 'Barbell Standing Front Raise Over Head', sets: 3, reps: '12' },
              { name: 'Barbell Seated Behind Head Military Press', sets: 3, reps: '10' },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
              { name: 'Walking on Stepmill', duration: '20 minutes', sets: null, reps: null },
            ],
          },
          {
            day: 'Day 5',
            name: 'Waist & Core Circuit',
            exercises: [
              { name: 'Barbell Press Sit-up', sets: 3, reps: '15' },
              { name: '3/4 Sit-up', sets: 3, reps: '20' },
              { name: 'Assisted Hanging Knee Raise With Throw Down', sets: 2, reps: '15' },
              { name: 'Assisted Lying Leg Raise With Lateral Throw Down', sets: 2, reps: '12' },
              { name: 'Air Bike', sets: 2, reps: '25' },
            ],
          },
        ],
        tips: [
          'Endomorphs need consistent cardio + strict nutrition.',
          'Don’t fear strength — it boosts metabolism.',
          'Log meals and workouts to measure progress and patterns.',
        ],
      },
    },
    'muscle-gain': {
      ectomorph: {
        name: 'Intermediate Muscle Gain - Ectomorph',
        description:
          'Designed for hard-gainers to build lean muscle mass with compound movements, progressive overload, and minimal cardio.',
        frequency: '5 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Chest + Triceps',
            exercises: [
              { name: 'Barbell Bench Press', sets: 4, reps: '10' },
              { name: 'Barbell Decline Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Incline Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Close-Grip Bench Press', sets: 3, reps: '10' },
              { name: 'Assisted Triceps Dip (Kneeling)', sets: 3, reps: '12' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Back + Biceps',
            exercises: [
              { name: 'Barbell Incline Row', sets: 3, reps: '12' },
              { name: 'Assisted Pull-up', sets: 3, reps: '10' },
              { name: 'Barbell Pullover to Press', sets: 3, reps: '10' },
              { name: 'Barbell Alternate Biceps Curl', sets: 3, reps: '10' },
              { name: 'Barbell Drag Curl', sets: 2, reps: '12' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Legs',
            exercises: [
              { name: 'Barbell Front Squat', sets: 4, reps: '10' },
              { name: 'Barbell Full Squat', sets: 3, reps: '12' },
              { name: 'Donkey Calf Raise', sets: 3, reps: '15' },
              { name: 'Lever Seated Calf Raise', sets: 3, reps: '15' },
              { name: 'Dumbbell Seated One Leg Calf Raise', sets: 2, reps: '15 each' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Shoulders + Traps',
            exercises: [
              { name: 'Barbell Seated Behind Head Military Press', sets: 3, reps: '10' },
              { name: 'Barbell Rear Delt Row', sets: 3, reps: '10' },
              { name: 'Barbell Standing Bradford Press', sets: 3, reps: '10' },
              { name: 'Barbell Rear Delt Raise', sets: 2, reps: '12' },
            ],
          },
          {
            day: 'Day 5',
            name: 'Arms + Core',
            exercises: [
              { name: 'Barbell Lying Close-Grip Press', sets: 3, reps: '10' },
              { name: 'Cable Reverse Wrist Curl', sets: 3, reps: '15' },
              { name: 'Dumbbell Lying Supination', sets: 3, reps: '12' },
              { name: 'Barbell Press Sit-up', sets: 3, reps: '15' },
              { name: 'Alternate Heel Touchers', sets: 3, reps: '20' },
            ],
          },
        ],
        tips: [
          'Consume a caloric surplus with high protein and carbs.',
          'Stick to compound lifts and increase weight weekly.',
          'Avoid excessive cardio; focus on muscle recovery.',
        ],
      },

      mesomorph: {
        name: 'Intermediate Muscle Gain - Mesomorph',
        description:
          'Maximizes muscle growth for naturally athletic individuals using a balance of volume and progressive resistance.',
        frequency: '5 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Chest + Shoulders',
            exercises: [
              { name: 'Barbell Wide Bench Press', sets: 4, reps: '10' },
              { name: 'Barbell Guillotine Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Incline Shoulder Raise', sets: 3, reps: '10' },
              { name: 'Barbell Rear Delt Raise', sets: 2, reps: '12' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Back + Arms',
            exercises: [
              { name: 'Barbell One Arm Bent Over Row', sets: 3, reps: '10' },
              { name: 'Assisted Parallel Close Grip Pull-up', sets: 3, reps: '10' },
              { name: 'Barbell Alternate Biceps Curl', sets: 3, reps: '10' },
              { name: 'Barbell JM Bench Press', sets: 3, reps: '10' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Leg Day',
            exercises: [
              { name: 'Barbell Bench Front Squat', sets: 4, reps: '10' },
              { name: 'Barbell Deadlift', sets: 3, reps: '10' },
              { name: 'Dumbbell Standing Calf Raise', sets: 3, reps: '15' },
              { name: 'Lever Standing Calf Raise', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Core + Light Shoulders',
            exercises: [
              { name: 'Barbell Press Sit-up', sets: 3, reps: '15' },
              { name: 'Assisted Hanging Knee Raise', sets: 3, reps: '12' },
              { name: '3/4 Sit-up', sets: 2, reps: '20' },
              { name: 'Barbell Standing Front Raise Over Head', sets: 2, reps: '10' },
            ],
          },
          {
            day: 'Day 5',
            name: 'Arms + Lower Arms',
            exercises: [
              { name: 'Barbell Curl', sets: 3, reps: '12' },
              { name: 'Cable Standing Back Wrist Curl', sets: 3, reps: '15' },
              { name: 'Barbell Reverse Wrist Curl v. 2', sets: 3, reps: '15' },
              { name: 'Barbell Wrist Curl', sets: 2, reps: '15' },
            ],
          },
        ],
        tips: [
          'Lift heavy, train consistently, and eat enough protein.',
          'Use full range of motion for maximum hypertrophy.',
          'Take 1–2 days for rest or active recovery.',
        ],
      },

      endomorph: {
        name: 'Intermediate Muscle Gain - Endomorph',
        description:
          'Focused on building muscle while minimizing fat gain with strategic volume and short bursts of cardio.',
        frequency: '5 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Chest + Cardio Finish',
            exercises: [
              { name: 'Barbell Front Raise and Pullover', sets: 3, reps: '10' },
              { name: 'Cable Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Incline Bench Press', sets: 3, reps: '10' },
              { name: 'Run (Equipment)', duration: '10 minutes', sets: null, reps: null },
            ],
          },
          {
            day: 'Day 2',
            name: 'Back + Arms',
            exercises: [
              { name: 'Barbell Decline Bent Arm Pullover', sets: 3, reps: '10' },
              { name: 'Barbell Incline Row', sets: 3, reps: '12' },
              { name: 'Barbell Close-Grip Bench Press', sets: 3, reps: '10' },
              { name: 'Cable Reverse Wrist Curl', sets: 2, reps: '15' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Legs + Calves',
            exercises: [
              { name: 'Barbell Front Chest Squat', sets: 3, reps: '10' },
              { name: 'Barbell Standing Leg Calf Raise', sets: 3, reps: '15' },
              { name: 'Barbell Standing Rocking Leg Calf Raise', sets: 2, reps: '15' },
              { name: 'Dumbbell Single Leg Calf Raise', sets: 2, reps: '15 each leg' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Core + Neck Mobility',
            exercises: [
              { name: 'Assisted Lying Leg Raise with Lateral Throw Down', sets: 3, reps: '15' },
              { name: 'Assisted Motion Russian Twist', sets: 3, reps: '20' },
              { name: 'Air Bike', sets: 3, reps: '25' },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
          {
            day: 'Day 5',
            name: 'Shoulders + Burnout',
            exercises: [
              { name: 'Barbell Seated Bradford Rocky Press', sets: 3, reps: '10' },
              { name: 'Barbell Rear Delt Row', sets: 3, reps: '10' },
              { name: 'Dumbbell Burpee', sets: 3, reps: '12' },
              {
                name: 'Walk Elliptical Cross Trainer',
                duration: '15 minutes',
                sets: null,
                reps: null,
              },
            ],
          },
        ],
        tips: [
          'Focus on slow, controlled reps with perfect form.',
          'Use compound lifts to boost testosterone and burn fat.',
          'Keep cardio short but frequent to avoid fat accumulation.',
        ],
      },
    },
    maintenance: {
      ectomorph: {
        name: 'Intermediate Maintenance - Ectomorph',
        description:
          'Focus on preserving lean muscle with low to moderate volume resistance and light cardio. Great for maintaining a lean physique.',
        frequency: '5 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Chest + Light Cardio',
            exercises: [
              { name: 'Barbell Incline Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Wide Bench Press', sets: 3, reps: '10' },
              { name: 'Assisted Chest Dip (Kneeling)', sets: 3, reps: '12' },
              { name: 'Walking on Stepmill', duration: '15 minutes', sets: null, reps: null },
            ],
          },
          {
            day: 'Day 2',
            name: 'Back + Arms',
            exercises: [
              { name: 'Barbell Bent Over Row', sets: 3, reps: '12' },
              { name: 'Assisted Pull-up', sets: 3, reps: '10' },
              { name: 'Barbell Curl', sets: 3, reps: '10' },
              { name: 'Barbell Lying Close-Grip Press', sets: 3, reps: '10' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Lower Body + Mobility',
            exercises: [
              { name: 'Barbell Front Squat', sets: 3, reps: '12' },
              { name: 'Donkey Calf Raise', sets: 3, reps: '15' },
              { name: 'Barbell Standing Leg Calf Raise', sets: 3, reps: '15' },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
          {
            day: 'Day 4',
            name: 'Shoulders + Core',
            exercises: [
              { name: 'Barbell Standing Bradford Press', sets: 3, reps: '10' },
              { name: 'Barbell Rear Delt Row', sets: 3, reps: '10' },
              { name: 'Assisted Hanging Knee Raise', sets: 3, reps: '15' },
              { name: 'Barbell Press Sit-up', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 5',
            name: 'Full Body + Active Recovery',
            exercises: [
              { name: 'Barbell Clean and Press', sets: 3, reps: '8' },
              { name: 'Air Bike', sets: 2, reps: '20' },
              {
                name: 'Walk Elliptical Cross Trainer',
                duration: '15 minutes',
                sets: null,
                reps: null,
              },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
        ],
        tips: [
          'Eat maintenance-level calories with balanced macros.',
          'Stay active with light cardio or walking on rest days.',
          'Focus on form and joint mobility to prevent injury.',
        ],
      },

      mesomorph: {
        name: 'Intermediate Maintenance - Mesomorph',
        description:
          'Balanced plan using moderate resistance and functional movement to help maintain strength and tone.',
        frequency: '5 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Upper Body Strength',
            exercises: [
              { name: 'Barbell Guillotine Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Rear Delt Raise', sets: 3, reps: '12' },
              { name: 'Barbell Alternate Biceps Curl', sets: 3, reps: '10' },
              { name: 'Cable Standing Back Wrist Curl', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Legs + Stability',
            exercises: [
              { name: 'Barbell Clean-Grip Front Squat', sets: 3, reps: '10' },
              { name: 'Dumbbell Single Leg Calf Raise', sets: 3, reps: '12 each leg' },
              { name: 'Balance Board', sets: 2, reps: '60 seconds' },
              { name: 'Barbell Standing Rocking Leg Calf Raise', sets: 2, reps: '15' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Back + Triceps',
            exercises: [
              { name: 'Barbell Incline Row', sets: 3, reps: '12' },
              { name: 'Barbell Pullover', sets: 3, reps: '12' },
              { name: 'Barbell Close-Grip Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell JM Bench Press', sets: 2, reps: '10' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Core + Neck',
            exercises: [
              { name: 'Assisted Motion Russian Twist', sets: 3, reps: '20' },
              { name: '3/4 Sit-up', sets: 3, reps: '20' },
              { name: 'Barbell Press Sit-up', sets: 2, reps: '15' },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
          {
            day: 'Day 5',
            name: 'Cardio + Recovery',
            exercises: [
              { name: 'Run (Equipment)', duration: '20 minutes', sets: null, reps: null },
              { name: 'Burpee', sets: 3, reps: '12' },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
              { name: 'Walking on Stepmill', duration: '15 minutes', sets: null, reps: null },
            ],
          },
        ],
        tips: [
          'Mesomorphs can maintain easily with moderate effort.',
          'Add flexibility training weekly to stay injury-free.',
          'Mix light cardio with strength training for balance.',
        ],
      },

      endomorph: {
        name: 'Intermediate Maintenance - Endomorph',
        description:
          'Focuses on sustaining muscle tone and preventing fat gain through active workouts with mild cardio.',
        frequency: '5 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Chest + Cardio Finish',
            exercises: [
              { name: 'Barbell Decline Wide-Grip Press', sets: 3, reps: '10' },
              { name: 'Cable Bench Press', sets: 3, reps: '12' },
              { name: 'Dumbbell Burpee', sets: 3, reps: '12' },
              { name: 'Run', duration: '15 minutes', sets: null, reps: null },
            ],
          },
          {
            day: 'Day 2',
            name: 'Lower Body Strength',
            exercises: [
              { name: 'Barbell Full Squat', sets: 3, reps: '10' },
              { name: 'Barbell Standing Leg Calf Raise', sets: 3, reps: '15' },
              { name: 'Dumbbell Standing Calf Raise', sets: 3, reps: '15' },
              { name: 'Circles Knee Stretch', sets: 2, reps: '30 seconds' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Back + Upper Arms',
            exercises: [
              { name: 'Barbell Pullover to Press', sets: 3, reps: '12' },
              { name: 'Barbell One Arm Bent Over Row', sets: 3, reps: '10' },
              { name: 'Assisted Triceps Dip (Kneeling)', sets: 3, reps: '12' },
              { name: 'Barbell Decline Close Grip to Skull Press', sets: 2, reps: '10' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Core + Flexibility',
            exercises: [
              { name: 'Air Bike', sets: 3, reps: '20' },
              { name: 'Barbell Press Sit-up', sets: 3, reps: '15' },
              { name: 'Assisted Lying Leg Raise with Throw Down', sets: 2, reps: '15' },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
          {
            day: 'Day 5',
            name: 'Active Recovery + Full Body',
            exercises: [
              { name: 'Barbell Clean and Press', sets: 3, reps: '8' },
              { name: 'Stationary Bike Walk', duration: '20 minutes', sets: null, reps: null },
              {
                name: 'Walk Elliptical Cross Trainer',
                duration: '15 minutes',
                sets: null,
                reps: null,
              },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
        ],
        tips: [
          'Stick to regular training to avoid fat regain.',
          'Focus on total body movement with some cardio.',
          'Keep diet high in fiber, protein, and moderate carbs.',
        ],
      },
    },
  },

  advanced: {
    'weight-loss': {
      ectomorph: {
        name: 'Advanced Weight Loss - Ectomorph',
        description:
          'High-intensity training with a mix of cardio and resistance to achieve a ripped, lean physique without losing muscle.',
        frequency: '6 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Push Strength + Cardio',
            exercises: [
              { name: 'Barbell Bench Press', sets: 4, reps: '10' },
              { name: 'Barbell Incline Bench Press', sets: 4, reps: '10' },
              { name: 'Barbell Standing Front Raise Over Head', sets: 3, reps: '12' },
              { name: 'Run (Equipment)', duration: '20 minutes', sets: null, reps: null },
            ],
          },
          {
            day: 'Day 2',
            name: 'Pull Strength + Conditioning',
            exercises: [
              { name: 'Barbell Incline Row', sets: 4, reps: '12' },
              { name: 'Assisted Pull-up', sets: 3, reps: '12' },
              { name: 'Barbell Drag Curl', sets: 3, reps: '12' },
              { name: 'Burpee', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Leg Day',
            exercises: [
              { name: 'Barbell Front Squat', sets: 4, reps: '10' },
              { name: 'Barbell Standing Leg Calf Raise', sets: 4, reps: '15' },
              { name: 'Barbell Seated Calf Raise', sets: 3, reps: '15' },
              { name: 'Air Bike', sets: 3, reps: '25' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Chest + Core Burnout',
            exercises: [
              { name: 'Barbell Guillotine Bench Press', sets: 3, reps: '12' },
              { name: 'Cable Bench Press', sets: 3, reps: '12' },
              { name: 'Barbell Press Sit-up', sets: 3, reps: '15' },
              { name: 'Assisted Motion Russian Twist', sets: 3, reps: '20' },
            ],
          },
          {
            day: 'Day 5',
            name: 'Back + Arm Strength',
            exercises: [
              { name: 'Barbell Bent Over Row', sets: 4, reps: '10' },
              { name: 'Barbell Pullover to Press', sets: 3, reps: '10' },
              { name: 'Barbell Alternate Biceps Curl', sets: 3, reps: '10' },
              { name: 'Barbell JM Bench Press', sets: 2, reps: '12' },
            ],
          },
          {
            day: 'Day 6',
            name: 'Full Body HIIT + Mobility',
            exercises: [
              { name: 'Dumbbell Burpee', sets: 3, reps: '15' },
              {
                name: 'Walk Elliptical Cross Trainer',
                duration: '20 minutes',
                sets: null,
                reps: null,
              },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
        ],
        tips: [
          'Ensure adequate calorie intake to maintain lean mass.',
          'Focus on recovery—stretching, hydration, and sleep.',
          'Use progressive overload with perfect form.',
        ],
      },

      mesomorph: {
        name: 'Advanced Weight Loss - Mesomorph',
        description:
          'Aggressive fat burn plan for mesomorphs focusing on athletic performance, muscle retention, and definition.',
        frequency: '6 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Chest + Shoulders',
            exercises: [
              { name: 'Barbell Decline Bench Press', sets: 4, reps: '10' },
              { name: 'Barbell Rear Delt Raise', sets: 3, reps: '12' },
              { name: 'Barbell Standing Bradford Press', sets: 3, reps: '10' },
              { name: 'Burpee', sets: 3, reps: '12' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Back + Arms',
            exercises: [
              { name: 'Barbell One Arm Bent Over Row', sets: 4, reps: '10' },
              { name: 'Assisted Parallel Close Grip Pull-up', sets: 3, reps: '10' },
              { name: 'Barbell Close-Grip Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Curl', sets: 3, reps: '10' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Legs + Core',
            exercises: [
              { name: 'Barbell Full Squat', sets: 4, reps: '12' },
              { name: 'Barbell Deadlift', sets: 3, reps: '10' },
              { name: '3/4 Sit-up', sets: 3, reps: '20' },
              { name: 'Assisted Hanging Knee Raise', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Cardio Intensive',
            exercises: [
              { name: 'Run', duration: '25 minutes', sets: null, reps: null },
              { name: 'Stationary Bike Run v. 3', duration: '15 minutes', sets: null, reps: null },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
          {
            day: 'Day 5',
            name: 'Push Hypertrophy',
            exercises: [
              { name: 'Barbell Incline Shoulder Raise', sets: 4, reps: '10' },
              { name: 'Barbell Rear Delt Row', sets: 3, reps: '10' },
              { name: 'Barbell JM Bench Press', sets: 3, reps: '12' },
              { name: 'Assisted Triceps Dip (Kneeling)', sets: 2, reps: '15' },
            ],
          },
          {
            day: 'Day 6',
            name: 'Active Recovery + Core',
            exercises: [
              { name: 'Air Bike', sets: 3, reps: '25' },
              { name: 'Assisted Lying Leg Raise with Throw Down', sets: 3, reps: '15' },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
              { name: 'Walking on Stepmill', duration: '15 minutes', sets: null, reps: null },
            ],
          },
        ],
        tips: [
          'Use circuit training to increase calorie burn.',
          'Cycle between moderate and high-intensity phases.',
          'Don’t skip recovery and mobility work.',
        ],
      },

      endomorph: {
        name: 'Advanced Weight Loss - Endomorph',
        description:
          'High-volume, high-cardio fat-loss program optimized for body recomposition and metabolic enhancement in endomorphs.',
        frequency: '6 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Legs + Core Shred',
            exercises: [
              { name: 'Barbell Front Chest Squat', sets: 4, reps: '12' },
              { name: 'Barbell Standing Rocking Leg Calf Raise', sets: 3, reps: '15' },
              { name: '45° Side Bend', sets: 3, reps: '15' },
              { name: 'Barbell Press Sit-up', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Push Day + Cardio',
            exercises: [
              { name: 'Barbell Decline Wide-Grip Press', sets: 3, reps: '10' },
              { name: 'Cable Bench Press', sets: 3, reps: '12' },
              { name: 'Dumbbell Burpee', sets: 3, reps: '15' },
              { name: 'Run', duration: '15 minutes', sets: null, reps: null },
            ],
          },
          {
            day: 'Day 3',
            name: 'Pull Day + HIIT',
            exercises: [
              { name: 'Barbell Decline Bent Arm Pullover', sets: 3, reps: '12' },
              { name: 'Barbell Incline Row', sets: 3, reps: '12' },
              { name: 'Barbell Curl', sets: 3, reps: '12' },
              { name: 'Burpee', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Mobility + Recovery',
            exercises: [
              {
                name: 'Walk Elliptical Cross Trainer',
                duration: '20 minutes',
                sets: null,
                reps: null,
              },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
              { name: 'Air Bike', sets: 2, reps: '20' },
            ],
          },
          {
            day: 'Day 5',
            name: 'Shoulders + Arms Circuit',
            exercises: [
              { name: 'Barbell Seated Behind Head Military Press', sets: 3, reps: '10' },
              { name: 'Barbell Standing Front Raise Over Head', sets: 3, reps: '10' },
              { name: 'Barbell Alternate Biceps Curl', sets: 3, reps: '12' },
              { name: 'Cable Reverse Wrist Curl', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 6',
            name: 'Core Blast + Cardio',
            exercises: [
              { name: 'Assisted Motion Russian Twist', sets: 3, reps: '25' },
              { name: 'Assisted Hanging Knee Raise with Throw Down', sets: 3, reps: '15' },
              { name: 'Walking on Stepmill', duration: '20 minutes', sets: null, reps: null },
              { name: 'Burpee', sets: 2, reps: '15' },
            ],
          },
        ],
        tips: [
          'Strict nutrition is key — stay in a calorie deficit.',
          'Increase cardio duration weekly for progression.',
          'Include active recovery to boost metabolism.',
        ],
      },
    },

    'muscle-gain': {
      ectomorph: {
        name: 'Advanced Muscle Gain - Ectomorph',
        description:
          'High-volume compound training to build maximum lean muscle. Ideal for hard-gainers focusing on size and strength.',
        frequency: '6 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Chest + Triceps',
            exercises: [
              { name: 'Barbell Bench Press', sets: 4, reps: '10' },
              { name: 'Barbell Incline Bench Press', sets: 4, reps: '10' },
              { name: 'Barbell Close-Grip Bench Press', sets: 3, reps: '10' },
              { name: 'Assisted Triceps Dip (Kneeling)', sets: 3, reps: '12' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Back + Biceps',
            exercises: [
              { name: 'Barbell Incline Row', sets: 4, reps: '12' },
              { name: 'Assisted Pull-up', sets: 3, reps: '10' },
              { name: 'Barbell Alternate Biceps Curl', sets: 3, reps: '10' },
              { name: 'Barbell Drag Curl', sets: 3, reps: '10' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Legs + Calves',
            exercises: [
              { name: 'Barbell Front Squat', sets: 4, reps: '10' },
              { name: 'Barbell Full Squat', sets: 3, reps: '10' },
              { name: 'Donkey Calf Raise', sets: 3, reps: '15' },
              { name: 'Lever Standing Calf Raise', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Shoulders + Traps',
            exercises: [
              { name: 'Barbell Rear Delt Row', sets: 4, reps: '10' },
              { name: 'Barbell Standing Bradford Press', sets: 3, reps: '10' },
              { name: 'Barbell Rear Delt Raise', sets: 3, reps: '12' },
            ],
          },
          {
            day: 'Day 5',
            name: 'Arms Isolation',
            exercises: [
              { name: 'Barbell JM Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Curl', sets: 3, reps: '12' },
              { name: 'Cable Reverse Wrist Curl', sets: 3, reps: '15' },
              { name: 'Dumbbell Lying Supination', sets: 2, reps: '15' },
            ],
          },
          {
            day: 'Day 6',
            name: 'Core + Mobility',
            exercises: [
              { name: 'Barbell Press Sit-up', sets: 3, reps: '15' },
              { name: 'Assisted Motion Russian Twist', sets: 3, reps: '25' },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
        ],
        tips: [
          'Eat 200–300 kcal surplus daily, prioritize protein & carbs.',
          'Focus on progressive overload and good form.',
          'Avoid cardio except for warming up.',
        ],
      },

      mesomorph: {
        name: 'Advanced Muscle Gain - Mesomorph',
        description:
          'Structured hypertrophy training for natural muscle-builders. Focus on size, shape, and symmetry.',
        frequency: '6 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Chest + Shoulders',
            exercises: [
              { name: 'Barbell Guillotine Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Incline Shoulder Raise', sets: 3, reps: '10' },
              { name: 'Barbell Wide Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Seated Bradford Rocky Press', sets: 3, reps: '12' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Back + Biceps',
            exercises: [
              { name: 'Barbell One Arm Bent Over Row', sets: 4, reps: '10' },
              { name: 'Barbell Pullover to Press', sets: 3, reps: '12' },
              { name: 'Barbell Alternate Biceps Curl', sets: 3, reps: '12' },
              { name: 'Barbell Curl', sets: 3, reps: '10' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Legs + Stability',
            exercises: [
              { name: 'Barbell Clean-Grip Front Squat', sets: 4, reps: '10' },
              { name: 'Barbell Standing Rocking Leg Calf Raise', sets: 3, reps: '15' },
              { name: 'Dumbbell Standing Calf Raise', sets: 3, reps: '15' },
              { name: 'Balance Board', sets: 2, reps: '60 seconds' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Shoulders + Arms',
            exercises: [
              { name: 'Barbell Rear Delt Row', sets: 3, reps: '12' },
              { name: 'Barbell Standing Front Raise Over Head', sets: 3, reps: '10' },
              { name: 'Barbell Close-Grip Bench Press', sets: 3, reps: '12' },
              { name: 'Cable Wrist Curl', sets: 2, reps: '15' },
            ],
          },
          {
            day: 'Day 5',
            name: 'Core + Neck',
            exercises: [
              { name: 'Barbell Press Sit-up', sets: 3, reps: '15' },
              { name: '3/4 Sit-up', sets: 3, reps: '20' },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
          {
            day: 'Day 6',
            name: 'Full Body Pump',
            exercises: [
              { name: 'Barbell Clean and Press', sets: 3, reps: '8' },
              { name: 'Dumbbell Burpee', sets: 3, reps: '15' },
              { name: 'Air Bike', sets: 2, reps: '25' },
            ],
          },
        ],
        tips: [
          'Stick to clean bulking for quality gains.',
          'Use time under tension (TUT) for intensity.',
          'Track weekly PRs and muscle groups worked.',
        ],
      },

      endomorph: {
        name: 'Advanced Muscle Gain - Endomorph',
        description:
          'Controlled lean-bulking program with structured resistance and light cardio to prevent fat gain while building muscle.',
        frequency: '6 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Chest + Triceps',
            exercises: [
              { name: 'Cable Bench Press', sets: 3, reps: '12' },
              { name: 'Barbell Decline Wide-Grip Press', sets: 3, reps: '10' },
              { name: 'Assisted Chest Dip (Kneeling)', sets: 3, reps: '12' },
              { name: 'Barbell JM Bench Press', sets: 3, reps: '10' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Back + Biceps',
            exercises: [
              { name: 'Barbell Bent Over Row', sets: 3, reps: '12' },
              { name: 'Barbell Pullover', sets: 3, reps: '10' },
              { name: 'Barbell Drag Curl', sets: 3, reps: '10' },
              { name: 'Barbell Lying Close-Grip Press', sets: 2, reps: '12' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Leg Day',
            exercises: [
              { name: 'Barbell Bench Squat', sets: 4, reps: '10' },
              { name: 'Barbell Standing Leg Calf Raise', sets: 3, reps: '15' },
              { name: 'Dumbbell Seated One Leg Calf Raise', sets: 3, reps: '15' },
              { name: 'Barbell Deadlift', sets: 3, reps: '10' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Core + Flexibility',
            exercises: [
              { name: 'Assisted Lying Leg Raise with Throw Down', sets: 3, reps: '15' },
              { name: 'Alternate Heel Touchers', sets: 3, reps: '20' },
              { name: 'Air Bike', sets: 2, reps: '25' },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
          {
            day: 'Day 5',
            name: 'Shoulders + Arms',
            exercises: [
              { name: 'Barbell Standing Front Raise Over Head', sets: 3, reps: '10' },
              { name: 'Barbell Rear Delt Raise', sets: 3, reps: '12' },
              { name: 'Barbell Alternate Biceps Curl', sets: 3, reps: '12' },
              { name: 'Cable Standing Back Wrist Curl', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 6',
            name: 'Light Cardio + Mobility',
            exercises: [
              {
                name: 'Walk Elliptical Cross Trainer',
                duration: '20 minutes',
                sets: null,
                reps: null,
              },
              { name: 'Dumbbell Burpee', sets: 2, reps: '12' },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
        ],
        tips: [
          'Use slow bulking with lean protein and complex carbs.',
          'Include light cardio to keep fat levels in check.',
          'Avoid cheat meals during bulk; track macros tightly.',
        ],
      },
    },

    maintenance: {
      ectomorph: {
        name: 'Advanced Maintenance - Ectomorph',
        description:
          'Low to moderate intensity training focused on muscle preservation and flexibility with minimal cardio.',
        frequency: '6 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Chest + Mobility',
            exercises: [
              { name: 'Barbell Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Incline Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Front Raise and Pullover', sets: 2, reps: '12' },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
          {
            day: 'Day 2',
            name: 'Back + Biceps',
            exercises: [
              { name: 'Barbell Incline Row', sets: 3, reps: '12' },
              { name: 'Assisted Pull-up', sets: 3, reps: '10' },
              { name: 'Barbell Curl', sets: 3, reps: '10' },
              { name: 'Barbell Alternate Biceps Curl', sets: 2, reps: '12' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Legs + Core',
            exercises: [
              { name: 'Barbell Front Squat', sets: 3, reps: '12' },
              { name: 'Donkey Calf Raise', sets: 3, reps: '15' },
              { name: '3/4 Sit-up', sets: 3, reps: '20' },
              { name: 'Air Bike', sets: 2, reps: '20' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Shoulders + Recovery',
            exercises: [
              { name: 'Barbell Rear Delt Row', sets: 3, reps: '10' },
              { name: 'Barbell Standing Front Raise Over Head', sets: 3, reps: '12' },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
          {
            day: 'Day 5',
            name: 'Arms Isolation + Core',
            exercises: [
              { name: 'Barbell JM Bench Press', sets: 3, reps: '10' },
              { name: 'Cable Reverse Wrist Curl', sets: 3, reps: '15' },
              { name: 'Barbell Press Sit-up', sets: 3, reps: '15' },
              { name: 'Assisted Motion Russian Twist', sets: 2, reps: '25' },
            ],
          },
          {
            day: 'Day 6',
            name: 'Active Recovery',
            exercises: [
              {
                name: 'Walk Elliptical Cross Trainer',
                duration: '20 minutes',
                sets: null,
                reps: null,
              },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
              { name: 'Balance Board', sets: 2, reps: '60 seconds' },
            ],
          },
        ],
        tips: [
          'Eat at maintenance calorie level with moderate carbs.',
          'Prioritize mobility, stretching, and joint care.',
          'Minimize cardio to prevent muscle loss.',
        ],
      },

      mesomorph: {
        name: 'Advanced Maintenance - Mesomorph',
        description:
          'Perfect balance of strength and conditioning to retain muscle definition and endurance.',
        frequency: '6 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Chest + Shoulders',
            exercises: [
              { name: 'Barbell Decline Bench Press', sets: 3, reps: '10' },
              { name: 'Barbell Rear Delt Raise', sets: 3, reps: '12' },
              { name: 'Barbell Standing Bradford Press', sets: 3, reps: '10' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Back + Core',
            exercises: [
              { name: 'Barbell Bent Over Row', sets: 3, reps: '12' },
              { name: 'Barbell Pullover', sets: 3, reps: '12' },
              { name: 'Barbell Press Sit-up', sets: 3, reps: '15' },
              { name: 'Air Bike', sets: 2, reps: '25' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Legs + Glutes',
            exercises: [
              { name: 'Barbell Clean-Grip Front Squat', sets: 3, reps: '10' },
              { name: 'Barbell Standing Leg Calf Raise', sets: 3, reps: '15' },
              { name: 'Dumbbell Seated One Leg Calf Raise', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Cardio + Recovery',
            exercises: [
              { name: 'Run (Equipment)', duration: '20 minutes', sets: null, reps: null },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
          {
            day: 'Day 5',
            name: 'Arms + Grip',
            exercises: [
              { name: 'Barbell Alternate Biceps Curl', sets: 3, reps: '10' },
              { name: 'Cable Wrist Curl', sets: 3, reps: '15' },
              { name: 'Cable Standing Back Wrist Curl', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 6',
            name: 'Functional Core + Stretch',
            exercises: [
              { name: 'Assisted Lying Leg Raise with Throw Down', sets: 3, reps: '15' },
              { name: 'Assisted Motion Russian Twist', sets: 2, reps: '25' },
              {
                name: 'Walk Elliptical Cross Trainer',
                duration: '15 minutes',
                sets: null,
                reps: null,
              },
            ],
          },
        ],
        tips: [
          'Use varied training intensities to avoid plateau.',
          'Include 1–2 light cardio days per week.',
          'Stretch and warm up before strength work.',
        ],
      },

      endomorph: {
        name: 'Advanced Maintenance - Endomorph',
        description:
          'Fat-control focused maintenance with structured strength and regular cardio to avoid rebound weight gain.',
        frequency: '6 days/week',
        sessions: [
          {
            day: 'Day 1',
            name: 'Chest + Conditioning',
            exercises: [
              { name: 'Cable Bench Press', sets: 3, reps: '12' },
              { name: 'Barbell Decline Wide-Grip Press', sets: 3, reps: '10' },
              { name: 'Dumbbell Burpee', sets: 3, reps: '12' },
            ],
          },
          {
            day: 'Day 2',
            name: 'Legs + Core',
            exercises: [
              { name: 'Barbell Front Chest Squat', sets: 3, reps: '12' },
              { name: 'Barbell Standing Rocking Leg Calf Raise', sets: 3, reps: '15' },
              { name: '45° Side Bend', sets: 3, reps: '20' },
              { name: 'Barbell Press Sit-up', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 3',
            name: 'Back + Arms',
            exercises: [
              { name: 'Barbell Pullover to Press', sets: 3, reps: '12' },
              { name: 'Barbell One Arm Bent Over Row', sets: 3, reps: '10' },
              { name: 'Barbell JM Bench Press', sets: 3, reps: '10' },
              { name: 'Cable Reverse Wrist Curl', sets: 3, reps: '15' },
            ],
          },
          {
            day: 'Day 4',
            name: 'Steady-State Cardio',
            exercises: [
              {
                name: 'Walk Elliptical Cross Trainer',
                duration: '20 minutes',
                sets: null,
                reps: null,
              },
              { name: 'Air Bike', sets: 2, reps: '25' },
              { name: 'Side Push Neck Stretch', duration: '30 seconds', sets: 2 },
            ],
          },
          {
            day: 'Day 5',
            name: 'Shoulders + Mobility',
            exercises: [
              { name: 'Barbell Standing Bradford Press', sets: 3, reps: '10' },
              { name: 'Barbell Rear Delt Row', sets: 3, reps: '12' },
              { name: 'Neck Side Stretch', duration: '30 seconds', sets: 2 },
              { name: 'Balance Board', sets: 2, reps: '60 seconds' },
            ],
          },
          {
            day: 'Day 6',
            name: 'Core Stability + Recovery',
            exercises: [
              { name: 'Assisted Hanging Knee Raise', sets: 3, reps: '15' },
              { name: 'Air Bike', sets: 3, reps: '20' },
              { name: 'Walking on Stepmill', duration: '15 minutes', sets: null, reps: null },
            ],
          },
        ],
        tips: [
          'Stick to clean maintenance nutrition (low sugar, moderate carb).',
          'Do cardio at least 3x a week.',
          'Strength + movement = ideal endomorph maintenance.',
        ],
      },
    },
  },
};

export default workoutPlans;
