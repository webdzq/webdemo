package net.vicp.jiasoft;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class Example implements Serializable {
	private final static long serialVersionUID = 1L;

	public String sayString(String name) {
		return "Hello " + name + " !";
	}

	public List sayList(List list) {
		list.add(new Integer(6));
		return list;
	}

	public Map sayMap(Map map) {
		map.put("age", "23");
		return map;
	}

	public Set saySet(Set set) {
		set.add("sex");
		return set;
	}

	public User sayUser(User user) {
		user.setAge(25);
		return user;
	}

	public String putSession(String name, HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.setAttribute("name", name);
		return session.getAttribute("name").toString();
	}
}
