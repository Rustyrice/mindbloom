import { supabase } from "./client";

const formattedDate = (date) => {
    var date = new Date(date); // Get the current date

    // Get the year, month, and day
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });

    var formattedDate = year + "-" + month + "-" + day; // Generate yyyy-mm-dd date string

    return formattedDate;
}

const getWeek = (date) => {
    var date = new Date(); // Get the current date

    // Get monday of the current week
    var day = date.getDay(); // Get the current day of the week, 0 = sunday, 1 = monday, etc.
    var diff = date.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday

    date = new Date(date.setDate(diff)); // set date to monday of the current week

    var dates = [];
    for (var i = 0; i < 7; i++) {
        dates.push(formattedDate(date));
        date.setDate(date.getDate() + 1);
    }

    return dates;
}

async function getUserId() {
    const { data, error } = await supabase.auth.getSession()
    if (data.session) { // if there is a session, user is logged in
        return data.session.user.id
    }
    throw error;
}

export const getSleepDataOfWeek = async ({date, userId}) => {

    if (userId == null) {
        userId = await getUserId();
    }

    const week = getWeek(date);

    const { data,  error } = await supabase
            .from("sleep")
            .select("*")
            .in("date", week)
            .order("date", { ascending: true })
            .eq("user_id", userId);
    if (error) throw error;

    return data;
}

export const getWaterDataOfWeek = async ({date, userId}) => {
    
    if (userId == null) {
        userId = await getUserId();
    }

    const week = getWeek(date);

    const { data,  error } = await supabase
            .from("water")
            .select("*")
            .in("date", week)
            .order("date", { ascending: true })
            .eq("user_id", userId);
    if (error) throw error;

    return data;
}

export const getAvgDailyPoints = async (date, type) => {
    
    const userId = await getUserId();


    const week = getWeek(date);

    const { data,  error } = await supabase
            .from("points")
            .select("*")
            .in("date", week)
            .order("date", { ascending: true })
            .eq("user_id", userId)
            .eq("type", type);
    if (error) throw error;

    const points = data.reduce((acc, point) => acc + point.points, 0); // sum all points
    const days = data.length; // get number of days
    const avg = points / days; // calculate average

    return parseInt(avg);
}

export const getTotalPoints = async (userId) => {

    if (userId == null) {
        userId = await getUserId();
    }
    const { data, error } = await supabase
      .from("points")
      .select("*")
      .eq("user_id", userId)
      if (error) throw error;

    return data.reduce((acc, point) => acc + point.points, 0);
};

export const getTotalPointsofWeek = async ({date, userId}) => {

    if (userId == null) {
        userId = await getUserId();
    }

    const week = getWeek(date);

    const { data, error } = await supabase
      .from("points")
      .select("*")
      .in("date", week)
      .eq("user_id", userId)
      if (error) throw error;

    return data.reduce((acc, point) => acc + point.points, 0);
}


