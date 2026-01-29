import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config({ path: '../.env.local' });

// Test script to verify trivia answer tracking
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function testTriviaInsert() {
  console.log('Testing trivia answer insert into master_actions...');

  // Use a test user ID - you'll need to replace this with an actual user ID from your database
  const testUserId = 'test-user-id'; // Replace with real user ID
  const testQuestionId = 'genesis01';
  const testUsername = 'TestUser';

  const { data, error } = await supabase
    .from('master_actions')
    .insert({
      user_id: testUserId,
      action_type: 'trivia_question_answered',
      action_label: testQuestionId,
      username: testUsername
    })
    .select();

  if (error) {
    console.error('❌ Insert failed:', error);
    return false;
  }

  console.log('✅ Insert successful:', data);
  return true;
}

// Run the test
testTriviaInsert().then(success => {
  if (success) {
    console.log('Test passed - master_actions insert works');
  } else {
    console.log('Test failed - master_actions insert does not work');
  }
  process.exit(success ? 0 : 1);
});